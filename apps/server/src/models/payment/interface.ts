import { Document, Model, Types } from "mongoose";
import { IUser } from "../user/interface.js";

export type Plan = "starter" | "professional" | "enterprise";

export interface IPayment extends Document {
    user_id: Types.ObjectId | IUser;
    tran_id: string;
    plan: Plan;
    status: "padding" | "success";
}

export type PaymentModel = Model<IPayment, Record<string, unknown>>;
