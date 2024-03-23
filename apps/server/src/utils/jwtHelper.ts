import jwt, { Secret } from "jsonwebtoken";
import config from "../config/index.js";
import { JwtPayload } from "../types/index.js";
import { IUser } from "../models/user/interface.js";
import { Request } from "express";

const encodeToken = (payload: IUser) => {
    const secret = config.jwt.secret as Secret;
    const { _id, name, email, phone, image, role, address, isVerify } = payload;
    return jwt.sign({ id: _id, name, email, phone, image, role, address, isVerify }, secret, { expiresIn: "7d" });
};

const decodeToken = async (req: Request): Promise<JwtPayload | null> => {
    const secret = config.jwt.secret as Secret;
    const token = req.headers.authorization || "";

    try {
        return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
        return null;
    }
};

export const jwtHelper = { encodeToken, decodeToken };
