import { Phone, Video } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { IconButton } from "@/components/ui/icon-button";
import { AvatarWithFallback } from "@/components/ui/avatar";

export default function ChatHeader({ room }: { room: string }) {
    const { booking } = useAppSelector((state) => state.booking);
    const chat = booking.findIndex((b) => b.room === room);

    return (
        <div className="z-20 sticky top-0 bg-background border-b py-5 flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
                <AvatarWithFallback src={booking[chat]?.receiver?.image} />
                <div className="space-y-1">
                    <h5 className="leading-none">{booking[chat]?.receiver?.name}</h5>
                    <h6 className="leading-none text-muted-foreground">{booking[chat]?.product}</h6>
                </div>
            </div>
            <div className="flex gap-4">
                <IconButton>
                    <Phone size={16} />
                </IconButton>
                <IconButton>
                    <Video size={16} />
                </IconButton>
            </div>
        </div>
    );
}
