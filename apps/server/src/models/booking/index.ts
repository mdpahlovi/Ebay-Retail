import mongoose, { Schema } from "mongoose";
import { BookingModel, IBooking } from "./interface.js";
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new Schema(
    {
        user: { type: ObjectId, ref: "user" },
        type: { type: String, enum: ["text", "image", "audio"], default: "text" },
        content: { type: String },
    },
    { timestamps: true, versionKey: false }
);

const bookingSchema = new Schema<IBooking>(
    {
        date: Date,
        location: String,
        buyer: { type: ObjectId, ref: "user" },
        seller: { type: ObjectId, ref: "user" },
        product: { type: ObjectId, ref: "product" },
        messages: [messageSchema],
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model<IBooking, BookingModel>("booking", bookingSchema);
