import moment from "moment";
import { ProductCardProps } from "@/types";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { BookingDialog, BookingTrigger } from "@/components/dialogs/booking";
import { CardDescription, CardTitle } from "@/components/ui/card";

const ProductCard = ({ product, refetch }: ProductCardProps) => {
    const { name, image, location, resale_price, original_price, purchase_date, description, condition, seller, isBooked, createdAt } =
        product;

    return (
        <Dialog>
            <div className="flex flex-col border rounded-lg overflow-hidden sm:flex-row">
                <div className="flex-none w-full h-64 sm:h-auto sm:w-48 md:w-64 lg:w-96 xl:w-48 relative">
                    <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="w-full px-5 py-4">
                    <div>
                        <div className="flex justify-between items-center">
                            <CardTitle>{name}</CardTitle>
                            <CardTitle className="hidden sm:block">{resale_price}৳</CardTitle>
                        </div>
                        <div className="flex justify-between items-center">
                            <Badge className="my-2.5">{condition}</Badge>
                            <h4 className="sm:hidden">{resale_price}৳</h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <CardDescription className="line-clamp-6 sm:line-clamp-3">{description}</CardDescription>
                        <h6>Location: {location}</h6>
                        <h6>Original Price: {original_price}৳</h6>
                        <h6>Total Used: {moment(Number(purchase_date)).fromNow(true)}</h6>
                    </div>
                    <div className="mt-2.5 flex flex-wrap justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <AvatarWithFallback src={seller.image} />
                            <div>
                                <h5 className="font-semibold flex items-center gap-1">
                                    {seller.name}
                                    {seller.isVerify ? <img className="w-4 h-4" src="/icons/Check.png" alt="" /> : ""}
                                </h5>
                                <h6>{moment(Number(createdAt)).format("lll")}</h6>
                            </div>
                        </div>
                        <BookingTrigger isBooked={isBooked} />
                    </div>
                </div>
            </div>
            <BookingDialog product={product} refetch={refetch} />
        </Dialog>
    );
};

export default ProductCard;
