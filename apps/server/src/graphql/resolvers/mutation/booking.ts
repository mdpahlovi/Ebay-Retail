import Booking from "../../../models/booking/index.js";
import { Delete, Context, Update } from "../../../types/index.js";

interface Booking {
    date: string;
    location: string;
    seller: string;
    product: string;
}

export const BookingMutation = {
    createBooking: async (parent: any, args: Booking, { token }: Context) => {
        const newBooking = new Booking({ ...args, buyer: token.id });
        return await newBooking.save();
    },
    updateBooking: async (parent: any, { id, data }: Update<Booking>) => await Booking.findByIdAndUpdate(id, data, { new: true }),
    deleteBooking: async (parent: any, { id }: Delete) => await Booking.findByIdAndDelete(id),
};
