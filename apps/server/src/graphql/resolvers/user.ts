import { IUser } from "../../models/user/interface.js";
import Product from "../../models/product/index.js";
import Booking from "../../models/booking/index.js";
import { paymentLoader } from "../../dataLoaders/user/planLoader.js";

export const User = {
    plan: async ({ _id, role }: IUser) => {
        switch (role) {
            case "buyer":
                return null;
            case "seller":
                return await paymentLoader.load(_id);
            case "admin":
                return null;
        }
    },
    totalProduct: async ({ _id, role }: IUser) => {
        if (role === "seller") {
            return await Product.countDocuments({ seller: _id });
        } else {
            return null;
        }
    },
    totalBooking: async ({ _id, role }: IUser) => {
        switch (role) {
            case "buyer":
                return await Booking.countDocuments({ buyer: _id });
            case "seller":
                return await Booking.countDocuments({ seller: _id });
            case "admin":
                return null;
        }
    },
};
