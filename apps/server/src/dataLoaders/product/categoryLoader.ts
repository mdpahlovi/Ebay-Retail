import DataLoader from "dataloader";
import { ICategory } from "../../models/category/interface.js";
import Category from "../../models/category/index.js";

const batchCategories = async (ids: string[]): Promise<ICategory[]> => {
    const categories = await Category.find({ _id: { $in: ids } });

    const categoryData: { [key: string]: ICategory } = {};
    categories.forEach((category) => {
        categoryData[category.id] = category;
    });

    return ids.map((id) => categoryData[id]);
};

export const categoryLoader = new DataLoader<string, ICategory>(batchCategories);
