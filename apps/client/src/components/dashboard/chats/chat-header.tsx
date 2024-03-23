import { Booking } from "@/types/data";
import { Phone, Video } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { IconButton } from "@/components/ui/icon-button";
import { AvatarWithFallback } from "@/components/ui/avatar";

export default function ChatHeader({ booking }: { booking: Booking }) {
    const { user } = useAppSelector((state) => state.user);
    const chat_user = user?.role === "seller" ? booking.buyer : booking.seller;

    return (
        <div className="z-20 sticky top-0 bg-background border-b py-5 flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
                <AvatarWithFallback src={chat_user.image} />
                <div className="space-y-1">
                    <h5 className="leading-none">{chat_user?.name}</h5>
                    <h6 className="leading-none text-muted-foreground">{booking.product.name}</h6>
                </div>
            </div>
            <IconButton>
                <Phone />
            </IconButton>
            <IconButton>
                <Video />
            </IconButton>
        </div>
    );
}
