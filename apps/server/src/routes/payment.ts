import mongoose from "mongoose";
import config from "../config/index.js";
import express, { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts";
import Payment from "../models/payment/index.js";
import User from "../models/user/index.js";
import { jwtHelper } from "../utils/jwtHelper.js";
import { PLAN_AMOUNTS } from "../utils/getsslczdata.js";

const router = express.Router();

// SSLCommerz posts its callbacks as x-www-form-urlencoded; the app-level
// express.json() middleware does not parse those, so parse them here.
router.use(express.urlencoded({ extended: false }));

const sslcz = new SSLCommerzPayment(
    config.sslcommerz.store_id!,
    config.sslcommerz.store_passwd!,
    config.sslcommerz.is_live
);

type SslczCallback = {
    val_id?: string;
    tran_id?: string;
    amount?: string | number;
    status?: string;
};

/**
 * Verify a callback against SSLCommerz's server-side validation API.
 * Returns the validated payload, or null if the callback is missing a val_id,
 * the validation call fails, or SSLCommerz does not report the transaction as valid.
 */
async function validateSslcz(raw: SslczCallback) {
    if (!raw?.val_id) return null;

    try {
        const data = await sslcz.validate({ val_id: raw.val_id });
        if (!data || !["VALID", "VALIDATED"].includes(String(data.status).toUpperCase())) return null;
        return data;
    } catch {
        return null;
    }
}

/** Check the validated payload matches the payment we initiated. */
function matchesPayment(validated: any, payment: { tran_id: string; plan: string }) {
    return validated.tran_id === payment.tran_id && Number(validated.amount) === PLAN_AMOUNTS[payment.plan as keyof typeof PLAN_AMOUNTS];
}

/** Atomically mark the payment successful and upgrade the user to seller. */
async function activateSeller(payment_id: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const payment = await Payment.findByIdAndUpdate(payment_id, { status: "success" }, { session, new: true });
        const user = await User.findByIdAndUpdate(
            payment!.user_id,
            { role: "seller", isVerify: payment!.plan === "professional" || payment!.plan === "enterprise" },
            { session, new: true }
        );
        await session.commitTransaction();
        return user;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

router.post("/success/:payment_id", async (req: Request, res: Response) => {
    const { payment_id } = req.params;

    try {
        const payment = await Payment.findById(payment_id);
        if (!payment) return res.redirect(`${config.client_url}?payment=notfound`);

        // Never trust the callback: verify with SSLCommerz before granting anything.
        const validated = await validateSslcz(req.body as SslczCallback);
        if (!validated || !matchesPayment(validated, payment)) {
            await Payment.findByIdAndUpdate(payment_id, { status: "failed" });
            return res.redirect(`${config.client_url}?payment=failed`);
        }

        // IPN may have already activated this payment; just hand back the login token.
        if (payment.status === "success") {
            const user = await User.findById(payment.user_id);
            return res.redirect(`${config.client_url}?token=` + encodeURIComponent(jwtHelper.encodeToken(user)));
        }

        const user = await activateSeller(payment_id);
        res.redirect(`${config.client_url}?token=` + encodeURIComponent(jwtHelper.encodeToken(user)));
    } catch (error) {
        res.redirect(`${config.client_url}?payment=failed`);
    }
});

router.post("/fail/:payment_id", async (req: Request, res: Response) => {
    // Keep the record (audit trail) instead of deleting it.
    await Payment.findByIdAndUpdate(req.params.payment_id, { status: "failed" });
    res.redirect(`${config.client_url}?payment=failed`);
});

router.post("/cancel/:payment_id", async (req: Request, res: Response) => {
    await Payment.findByIdAndUpdate(req.params.payment_id, { status: "failed" });
    res.redirect(`${config.client_url}?payment=cancelled`);
});

// Server-to-server notification from SSLCommerz — the safety net in case the
// user's browser never reaches the success redirect.
router.post("/ipn", async (req, res): Promise<void> => {
    const raw = req.body as SslczCallback;

    const payment = await Payment.findOne({ tran_id: raw?.tran_id });
    if (!payment || payment.status === "success") {
        res.status(200).json({ status: "IGNORED" });
        return;
    }

    const validated = await validateSslcz(raw);
    const isValid = Boolean(validated && matchesPayment(validated, payment));
    if (isValid) await activateSeller(payment.id);
    else await Payment.findByIdAndUpdate(payment.id, { status: "failed" });

    res.status(200).json({ status: isValid ? "VALIDATED" : "FAILED" });
});

export const PaymentRoutes = router;
