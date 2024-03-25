import { User } from "@/types/data";
import { Phone, Video } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { AvatarWithFallback } from "@/components/ui/avatar";

export default function ChatHeader({ chat_user, product_name }: { chat_user: User; product_name: string }) {
    return (
        <div className="z-20 sticky top-0 bg-background border-b py-5 flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
                <AvatarWithFallback src={chat_user.image} />
                <div className="space-y-1">
                    <h5 className="leading-none">{chat_user?.name}</h5>
                    <h6 className="leading-none text-muted-foreground">{product_name}</h6>
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
