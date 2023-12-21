import format from "date-fns/format";
import { formatDistance } from "date-fns";
import { Product } from "@/types/data";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookingDialog, BookingTrigger } from "@/components/dialogs/booking";

const ProductCard = ({ product }: { product: Product }) => {
    const { name, image, location, resale_price, original_price, purchase_date, description, condition, seller, createdAt } = product;
    const used_year = formatDistance(new Date(), new Date(Number(purchase_date)));
    const post_date = format(new Date(Number(createdAt)), "PPp");

    return (
        <Dialog>
            <div className="flex flex-col border rounded-lg overflow-hidden sm:flex-row">
                <div className="flex-none w-full h-64 sm:h-auto sm:w-48 md:w-64 lg:w-96 xl:w-48 relative">
                    <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="w-full px-5 py-4">
                    <div>
                        <div className="flex justify-between items-center">
                            <h3>{name}</h3>
                            <h4 className="hidden sm:block">${resale_price}</h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <Badge className="my-2.5">{condition}</Badge>
                            <h4 className="sm:hidden">${resale_price}</h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <p className="line-clamp-6 sm:line-clamp-3">{description}</p>
                        <h5>Location : {location}</h5>
                        <h6>Original Price : ${original_price}</h6>
                        <h6>Used : {used_year}</h6>
                    </div>
                    <div className="mt-2.5 flex flex-wrap justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src={seller.image} alt="" />
                                <AvatarFallback />
                            </Avatar>
                            <div>
                                <h5 className="font-semibold flex items-center gap-1">
                                    {seller.name}
                                    {seller.isVerify ? <img className="w-4 h-4" src="/icons/Check.png" alt="" /> : ""}
                                </h5>
                                <h6>{post_date}</h6>
                            </div>
                        </div>
                        <BookingTrigger />
                    </div>
                </div>
            </div>
            <BookingDialog product={product} />
        </Dialog>
    );
};

export default ProductCard;
