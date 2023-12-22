import { Product } from "@/types/data";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BookingDialog, BookingTrigger } from "@/components/dialogs/booking";

const AdvertiseCard = ({ product }: { product: Product }) => {
    const { name, image, condition, original_price, resale_price, isBooked } = product;

    return (
        <Dialog>
            <div className="relative rounded-lg bg-overly p-6 pt-64" style={{ backgroundImage: `url(${image})` }}>
                <span className="absolute inset-0 bg-black/30 rounded-lg" />
                <Badge className="absolute top-4 left-0 rounded-none">{condition}</Badge>
                <div className="relative text-center">
                    <h3 className="uppercase tracking-wider text-white">
                        Save
                        <span className="relative before:absolute before:inset-x-0 before:bottom-0.5 before:h-2 before:bg-primary mx-2 2xl:mx-4">
                            <span className="relative">{Math.ceil(((original_price - resale_price) / original_price) * 100)}%</span>
                        </span>
                        on Buy
                    </h3>
                    <p className="mt-1 mb-4 text-white">{name}</p>
                    <BookingTrigger isBooked={isBooked} />
                </div>
            </div>
            <BookingDialog product={product} />
        </Dialog>
    );
};

export default AdvertiseCard;
