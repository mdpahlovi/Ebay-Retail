import { jwtDecode } from "jwt-decode";
import { UserToken } from "@/types";

export default function decodeToken(token: string | undefined): UserToken | null {
    if (token) {
        return jwtDecode(token);
    } else {
        return null;
    }
}
