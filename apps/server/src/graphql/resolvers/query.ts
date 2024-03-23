import User from "../../models/user/index.js";
import Category from "../../models/category/index.js";
import Product from "../../models/product/index.js";
import Booking from "../../models/booking/index.js";
import { Context } from "../../types/index.js";

export const Query = {
    allBuyer: async () => await User.find({ role: "buyer" }),
    allSeller: async () => await User.find({ role: "seller" }),
    user: async (parent: any, { id }: { id: string }) => await User.findById(id),

    categories: async () => await Category.find({}),
    category: async (parent: any, { id }: { id: string }) => await Category.findById(id),

    products: async (parent: any, args: any, { token }: Context) => await Product.find({ seller: token?.id }),
    product: async (parent: any, { id }: { id: string }) => await Product.findById(id),
    advertise: async () => await Product.find({ advertised: true }),

    bookings: async (parent: any, args: any, { token }: Context) => {
        switch (token?.role) {
            case "buyer":
                return await Booking.find({ buyer: token?.id });
            case "seller":
                return await Booking.find({ seller: token?.id });
            case "admin":
                return await Booking.find();
        }
    },
    booking: async (parent: any, { id }: { id: string }) => await Booking.findById(id),

    dashboard: async () => {
        const fields = { totalCount: { $sum: 1 }, lastAddedAt: { $last: "$createdAt" } };
        const category = await Category.aggregate([{ $group: { _id: "category", ...fields } }]);
        const product = await Product.aggregate([{ $group: { _id: "product", ...fields } }]);
        const user = await User.aggregate([{ $group: { _id: "$role", ...fields } }]);

        return [...category, ...product, ...user];
    },
};
