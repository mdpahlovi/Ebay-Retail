import { Category } from "@/types/data";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }: { category: Category }) => {
    const { id, name, image, total } = category;

    return (
        <Link to={`/category/${id}`} className="group">
            <img src={image} alt="" className="w-full h-48 object-cover object-center rounded-lg" />
            <div className="flex justify-between items-center p-2">
                <h5 className="group-hover:underline md:text-lg">{name}</h5>
                <h6>({total})</h6>
            </div>
        </Link>
    );
};

export default CategoryCard;
