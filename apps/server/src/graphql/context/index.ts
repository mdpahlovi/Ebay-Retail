import { jwtHelper } from "../../utils/jwtHelper.js";

export default async function ({ req, res }) {
    const token = await jwtHelper.decodeToken(req);
    return { token, res };
}
