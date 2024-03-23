import { userLoader } from "../../dataLoaders/userLoader.js";
import { productLoader } from "../../dataLoaders/booking/productLoader.js";

export const Booking = {
    buyer: async ({ buyer }: { buyer: string }) => await userLoader.load(buyer),
    seller: async ({ seller }: { seller: string }) => await userLoader.load(seller),
    product: async ({ product }: { product: string }) => await productLoader.load(product),
};
