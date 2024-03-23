import { Document, Model, Types } from "mongoose";
import { IUser } from "../user/interface.js";
import { ICategory } from "../category/interface.js";

export interface IProduct extends Document {
    category: Types.ObjectId | ICategory;
    name: string;
    image: string;
    resale_price: number;
    original_price: number;
    condition: string;
    description: string;
    location: string;
    purchase_date: string;
    seller: Types.ObjectId | IUser;
    advertised: boolean;
}

export type ProductModel = Model<IProduct, Record<string, unknown>>;
