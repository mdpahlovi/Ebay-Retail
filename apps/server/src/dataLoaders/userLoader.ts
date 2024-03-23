import DataLoader from "dataloader";
import { IUser } from "../models/user/interface.js";
import User from "../models/user/index.js";

const batchUsers = async (ids: string[]): Promise<IUser[]> => {
    const users = await User.find({ _id: { $in: ids } });

    const userData: { [key: string]: IUser } = {};
    users.forEach((user) => {
        userData[user.id] = user;
    });

    return ids.map((id) => userData[id]);
};

export const userLoader = new DataLoader<string, IUser>(batchUsers);
