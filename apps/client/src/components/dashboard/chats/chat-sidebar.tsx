import { Booking } from "@/types/data";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

export default function ChatSidebar({ bookings = [] }: { bookings: Booking[] }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("room");
    const { user } = useAppSelector((state) => state.user);

    return (
        <ScrollArea className={`${query ? "hidden" : "block"} px-6 md:border-r md:block`}>
            <h2 className="z-20 sticky top-0 bg-background py-5 border-b">Bookings</h2>
            <div>
                {bookings.map(({ id, buyer, seller, product }) => {
                    const chat_user = user?.role === "seller" ? buyer : seller;
                    return (
                        <div
                            key={id}
                            onClick={() => setSearchParams({ room: id })}
                            className={`${query === id ? "bg-muted" : "hover:bg-muted"} p-2.5 rounded flex items-center gap-2`}
                        >
                            <AvatarWithFallback src={chat_user.image} />
                            <div className="space-y-1">
                                <h5 className="leading-none">{chat_user.name}</h5>
                                <h6 className="leading-none text-muted-foreground">{product.name}</h6>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ScrollArea>
    );
}
