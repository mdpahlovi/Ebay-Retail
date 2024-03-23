import { GraphQLError } from "graphql";
import Payment from "../../../models/payment/index.js";
import Product from "../../../models/product/index.js";
import { Delete, Context, Update } from "../../../types/index.js";
import { uploadImage } from "../../../utils/uploadImage.js";

type Product = {
    category: string;
    name: string;
    image: string;
    resale_price: number;
    original_price: number;
    condition: string;
    description: string;
    location: string;
    purchase_date: string;
};

type Advertise = { id: string; advertised: boolean };

export const ProductMutation = {
    createProduct: async (parent: any, args: Product, { token }: Context) => {
        if (args?.image) args.image = await uploadImage(args.image, "Product");
        const data = { ...args, seller: token?.id };
        const newProduct = new Product(data);
        return await newProduct.save();
    },
    updateProduct: async (parent: any, { id, data }: Update<Product>) => {
        const product = await Product.findById(id, { image: 1 });
        if (data?.image !== product?.image) data.image = await uploadImage(data.image, "Product");
        return await Product.findByIdAndUpdate(id, data, { new: true });
    },
    advertiseProduct: async (parent: any, { id, advertised }: Advertise, { token }: Context) => {
        const payment = await Payment.findOne({ user_id: token.id });
        if (!payment || payment?.plan === "starter") {
            throw new GraphQLError("Please Update Yor Plan");
        } else {
            return await Product.findByIdAndUpdate(id, { advertised }, { new: true });
        }
    },
    deleteProduct: async (parent: any, { id }: Delete) => await Product.findByIdAndDelete(id),
};
