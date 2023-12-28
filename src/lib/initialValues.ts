import { UserToken } from "@/types";
import { Booking, Product } from "@/types/data";

export const createProductValues = {
    category: "",
    name: "",
    image: "",
    resale_price: "",
    original_price: "",
    condition: "",
    description: "",
    location: "",
    purchase_date: new Date(),
};

export const updateProductValues = (product: Product) => {
    const { category, name, image, resale_price, original_price, condition, description, location, purchase_date } = product;

    return {
        category: category?.id ? category.id : "",
        name: name ? name : "",
        image: image ? image : "",
        resale_price: resale_price ? resale_price : "",
        original_price: original_price ? original_price : "",
        condition: condition ? condition : "",
        description: description ? description : "",
        location: location ? location : "",
        purchase_date: purchase_date ? new Date(Number(purchase_date)) : new Date(),
    };
};

export const updateBookingValues = (booking: Booking) => {
    const { date, location } = booking;

    return {
        date: date ? new Date(Number(date)) : new Date(),
        location: location ? location : "",
    };
};

export const updateUserValues = (user: UserToken) => {
    const { name, email, phone, address } = user;

    return {
        name: name ? name : "",
        email: email,
        phone: phone ? phone : "",
        address: address ? address : "",
    };
};

export const pricingValues = (user: UserToken) => {
    const { name, email, phone, address } = user;

    return {
        name: name ? name : "",
        email: email,
        phone: phone ? phone : "",
        address: address ? address : "",
    };
};
