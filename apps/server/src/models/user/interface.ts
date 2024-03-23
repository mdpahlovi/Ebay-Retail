import { Document, Model } from "mongoose";

export type Role = "buyer" | "seller" | "admin";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    image: string;
    role: Role;
    address: string;
    provider: "custom" | "google" | "github";
    password: string;
    isVerify: boolean;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
