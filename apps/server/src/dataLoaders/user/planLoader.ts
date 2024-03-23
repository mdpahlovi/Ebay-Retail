import DataLoader from "dataloader";
import { IPayment } from "../../models/payment/interface.js";
import Payment from "../../models/payment/index.js";

export default function capitalizeFirstWord(string?: string) {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
}

const batchPayments = async (ids: string[]) => {
    const payments = await Payment.find({ user_id: { $in: ids } }, { _id: 0, user_id: 1, plan: 1 });

    const paymentData: { [key: string]: IPayment } = {};
    payments.forEach((payment) => {
        paymentData[payment.user_id as unknown as string] = payment;
    });

    return ids.map((id) => capitalizeFirstWord(paymentData[id].plan));
};

export const paymentLoader = new DataLoader(batchPayments);
