import { Product } from "@/types/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AdvertiseCard = ({ product }: { product: Product }) => {
    const { image, condition, name, isBooked } = product;

    return (
        <div className="relative rounded-lg bg-overly p-6 pt-64" style={{ backgroundImage: `url(${image})` }}>
            <span className="absolute inset-0 bg-black/30 dark:bg-black/70 rounded-lg" />
            <Badge className="absolute top-4 left-0 rounded-none">{condition}</Badge>
            <div className="relative text-center">
                <h3 className="uppercase tracking-wider text-white">
                    Save
                    <span className="relative before:absolute before:inset-x-0 before:bottom-0.5 before:h-2 before:bg-primary mx-2 2xl:mx-4">
                        <span className="relative">10%</span>
                    </span>
                    on Sales
                </h3>
                <p className="mt-1 text-white">{name}</p>
                <Button className="mt-4 w-full" disabled={isBooked}>
                    Book Now
                </Button>
            </div>
        </div>
    );
};

export default AdvertiseCard;
