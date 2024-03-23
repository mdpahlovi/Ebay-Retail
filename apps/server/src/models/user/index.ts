import mongoose, { Schema } from "mongoose";
import { IUser, UserModel } from "./interface.js";

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        image: { type: String, default: "https://shorturl.at/jnruF" },
        role: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer" },
        address: { type: String },
        provider: { type: String, enum: ["custom", "google", "github"], default: "custom" },
        password: { type: String },
        isVerify: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model<IUser, UserModel>("user", userSchema);
