import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Category } from "@/types/data";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }: { category: Category }) => {
    const { id, name, image, total } = category;

    return (
        <Link to={`/categories/${id}`} className="group relative w-full h-full">
            <Avatar className="w-full h-48 rounded-lg">
                <AvatarImage src={image} alt="" className="group-hover:scale-105 transition" />
                <AvatarFallback />
            </Avatar>
            <div className="flex justify-between items-center p-2">
                <h5 className="group-hover:underline">{name}</h5>
                <h6>({total})</h6>
            </div>
        </Link>
    );
};

export default CategoryCard;
