import DataLoader from "dataloader";
import Booking from "../../models/booking/index.js";

const batchBookings = async (ids: string[]): Promise<boolean[]> => {
    const bookings = await Booking.find({ product: { $in: ids } }, "product");
    const bookedProduct = bookings.map(({ product }) => product.toString());

    return ids.map((id) => bookedProduct.includes(id.toString()));
};

export const bookingLoader = new DataLoader<string, boolean>(batchBookings);
