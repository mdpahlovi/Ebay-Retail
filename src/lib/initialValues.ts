import { Product } from "@/types/data";

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
    return {
        category: product?.category?.id ? product.category.id : "",
        name: product?.name ? product.name : "",
        image: product?.image ? product.image : "",
        resale_price: product?.resale_price ? product.resale_price : "",
        original_price: product?.original_price ? product.original_price : "",
        condition: product?.condition ? product.condition : "",
        description: product?.description ? product.description : "",
        location: product?.location ? product.location : "",
        purchase_date: product?.purchase_date ? new Date(Number(product.purchase_date)) : new Date(),
    };
};
