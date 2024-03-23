import { Document, Model } from "mongoose";

export interface ICategory extends Document {
    name: string;
    image: string;
}

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
