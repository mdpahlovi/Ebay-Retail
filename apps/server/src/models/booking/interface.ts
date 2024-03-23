import { Document, Model, Types } from "mongoose";
import { IUser } from "../user/interface.js";
import { IProduct } from "../product/interface.js";

export interface IMessage extends Document {
    user: Types.ObjectId | IUser;
    type: "text" | "image" | "audio";
    content: string;
}

export interface IBooking extends Document {
    date: string;
    location: string;
    buyer: Types.ObjectId | IUser;
    seller: Types.ObjectId | IUser;
    product: Types.ObjectId | IProduct;
    messages: IMessage[];
}

export type BookingModel = Model<IBooking, Record<string, unknown>>;
