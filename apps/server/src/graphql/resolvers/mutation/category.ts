import Category from "../../../models/category/index.js";
import { Delete, Update } from "../../../types/index.js";
import { uploadImage } from "../../../utils/uploadImage.js";

interface Category {
    name: string;
    image: string;
}

export const CategoryMutation = {
    createCategory: async (parent: any, args: Category) => {
        if (args?.image) args.image = await uploadImage(args.image, "Category");
        const newCategory = new Category(args);
        return await newCategory.save();
    },
    updateCategory: async (parent: any, { id, data }: Update<Category>) => {
        const category = await Category.findById(id, { image: 1 });
        if (data?.image !== category?.image) data.image = await uploadImage(data.image, "Category");
        return await Category.findByIdAndUpdate(id, data, { new: true });
    },
    deleteCategory: async (parent: any, { id }: Delete) => await Category.findByIdAndDelete(id),
};
