import jwt from "jsonwebtoken";
import { UserToken } from "@/types";

export default function decodeToken(token: string): UserToken | null {
    const secret = "b16a1f7b846b029668e636ca8fb1c4230d16de5186024eb848ec08ba5b15905a";
    return jwt.verify(token, secret) as UserToken;
}
