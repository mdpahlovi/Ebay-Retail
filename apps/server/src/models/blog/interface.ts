import { Document, Model } from "mongoose";

export interface IBlog extends Document {
    question: string;
    answer: string;
    auther: {
        first_name: string;
        last_name: string;
        avatar: string;
    };
}

export type BlogModel = Model<IBlog, Record<string, unknown>>;
