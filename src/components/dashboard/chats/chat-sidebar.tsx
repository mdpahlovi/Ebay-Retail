import { Booking } from "@/types/data";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "react-router-dom";

export default function ChatSidebar({ bookings = [] }: { bookings: Booking[] }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("room");

    return (
        <ScrollArea className={`${query ? "hidden" : "block"} px-6 md:border-r md:block`}>
            <h2 className="z-20 sticky top-0 bg-background py-5 border-b">Bookings</h2>
            <div>
                {bookings.map(({ id, buyer, seller, product }) => (
                    <div
                        key={id}
                        onClick={() => setSearchParams({ room: id })}
                        className={`${query === id ? "bg-muted" : "hover:bg-muted"} p-2.5 rounded flex items-center gap-2`}
                    >
                        <AvatarWithFallback src={(buyer || seller).image} />
                        <div className="space-y-0.5">
                            <h4 className="leading-none">{(buyer || seller).name}</h4>
                            <p className="leading-none">{product.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
