import { Query } from "./query.js";
import { Auth } from "./mutation/auth.js";
import { UserMutation } from "./mutation/user.js";
import { CategoryMutation } from "./mutation/category.js";
import { ProductMutation } from "./mutation/product.js";
import { BookingMutation } from "./mutation/booking.js";
import { MessageMutation } from "./mutation/message.js";
import { User } from "./user.js";
import { Product } from "./product.js";
import { Booking } from "./booking.js";
import { Category } from "./category.js";

export const resolvers = {
    Query,
    Mutation: {
        ...Auth,
        ...UserMutation,
        ...CategoryMutation,
        ...ProductMutation,
        ...BookingMutation,
        ...MessageMutation,
    },
    User,
    Product,
    Booking,
    Category,
};
