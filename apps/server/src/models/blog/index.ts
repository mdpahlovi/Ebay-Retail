import mongoose, { Schema } from "mongoose";
import { BlogModel, IBlog } from "./interface.js";

const blogSchema = new Schema<IBlog>(
    {
        question: String,
        answer: String,
        auther: {
            first_name: String,
            last_name: String,
            avatar: String,
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model<IBlog, BlogModel>("blog", blogSchema);
