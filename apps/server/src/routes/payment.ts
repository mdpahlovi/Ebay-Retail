import mongoose from "mongoose";
import config from "../config/index.js";
import express, { Request, Response } from "express";
import Payment from "../models/payment/index.js";
import User from "../models/user/index.js";
import { jwtHelper } from "../utils/jwtHelper.js";

const router = express.Router();

router.post("/success/:payment_id", async (req: Request, res: Response) => {
    const { payment_id } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const payment = await Payment.findByIdAndUpdate(payment_id, { status: "success" }, { session });
        const user = await User.findByIdAndUpdate(
            payment.user_id,
            { role: "seller", isVerify: payment.plan === "professional" || payment.plan === "enterprise" },
            { session, new: true }
        );
        await Promise.all([payment, user]);
        await session.commitTransaction();

        const token = encodeURIComponent(jwtHelper.encodeToken(user));
        res.redirect(`${config.client_url}?token=` + token);
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
});

router.post("/fail/:payment_id", async (req: Request, res: Response) => {
    const { payment_id } = req.params;

    await Payment.findByIdAndDelete(payment_id);
    res.redirect(`${config.client_url}`);
});

router.post("/cancel/:payment_id", async (req: Request, res: Response) => {
    const { payment_id } = req.params;

    await Payment.findByIdAndDelete(payment_id);
    res.redirect(`${config.client_url}`);
});

router.post("/ipn", async (req: Request, res: Response) => {});

export const PaymentRoutes = router;
