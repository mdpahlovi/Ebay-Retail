import config from "../../../config/index.js";
import User from "../../../models/user/index.js";
import SSLCommerzPayment from "sslcommerz-lts";
import getsslczdata from "../../../utils/getsslczdata.js";
import { Context, Delete, Update } from "../../../types/index.js";
import { uploadImage } from "../../../utils/uploadImage.js";
import { Plan } from "../../../models/payment/interface.js";
import Payment from "../../../models/payment/index.js";
import { GraphQLError } from "graphql";
import gettranid from "../../../utils/gettranid.js";
import { jwtHelper } from "../../../utils/jwtHelper.js";

type User = { name: string; phone: string; image: string; address: string };
type BecomeSeller = { plan: Plan; name: string; phone: string; address: string };

export const UserMutation = {
    updateUser: async (parent: any, { id, data }: Update<User>) => {
        const user = await User.findById(id, { image: 1 });
        if (data?.image !== user?.image) data.image = await uploadImage(data.image, "User");
        return await User.findByIdAndUpdate(id, data, { new: true });
    },
    deleteUser: async (parent: any, { id }: Delete) => {
        const user = await User.findByIdAndDelete(id);
        return user;
    },
    becomeSeller: async (parent: any, { plan, ...args }: BecomeSeller, { res, token }: Context) => {
        const isExist = await Payment.findOne({ user_id: token.id });
        if (isExist && isExist?.status === "success") throw new GraphQLError("You are already seller");

        const role = plan === "starter" ? "seller" : "buyer";
        const status = plan === "starter" ? "success" : "padding";
        const user = await User.findByIdAndUpdate(token.id, { ...args, role }, { new: true });
        const newPayment = new Payment({ user_id: user.id, tran_id: gettranid(), plan, status });
        const payment = await newPayment.save();

        if (plan === "starter") {
            return jwtHelper.encodeToken(user);
        } else {
            const data = getsslczdata(payment, user);
            const { store_id, store_passwd, is_live } = config.sslcommerz;
            const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
            const apiResponse = await sslcz.init(data);

            return apiResponse.GatewayPageURL;
        }
    },
};
