import mongoose, { Schema } from "mongoose";
import { IProduct, ProductModel } from "./interface.js";
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new Schema<IProduct>(
    {
        category: { type: ObjectId, ref: "category" },
        name: String,
        image: String,
        resale_price: Number,
        original_price: Number,
        condition: String,
        description: String,
        location: String,
        purchase_date: Date,
        seller: { type: ObjectId, ref: "user" },
        advertised: Boolean,
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model<IProduct, ProductModel>("product", productSchema);
