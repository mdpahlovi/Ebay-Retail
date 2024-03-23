import mongoose, { Schema } from "mongoose";
import { IPayment, PaymentModel } from "./interface.js";
const { ObjectId } = mongoose.Schema.Types;

const paymentSchema = new Schema<IPayment>(
    {
        user_id: { type: ObjectId, ref: "user" },
        tran_id: { type: String, required: true },
        plan: { type: String, enum: ["starter", "professional", "enterprise"] },
        status: { type: String, enum: ["padding", "success"] },
    },
    { timestamps: true }
);

export default mongoose.model<IPayment, PaymentModel>("payment", paymentSchema);
