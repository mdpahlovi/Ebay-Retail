import { Booking } from "@/types/data";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/redux/hooks";

export default function ChatHeader({ booking }: { booking: Booking }) {
    const { user } = useAppSelector((state) => state.user);
    const chat_user = user?.role === "seller" ? booking.buyer : booking.seller;

    return (
        <div className="z-20 sticky top-0 bg-background border-b py-5 flex items-center gap-2">
            <AvatarWithFallback src={chat_user.image} />
            <div className="space-y-0.5">
                <h4 className="leading-none">{chat_user?.name}</h4>
                <p className="leading-none">{booking.product.name}</p>
            </div>
        </div>
    );
}
