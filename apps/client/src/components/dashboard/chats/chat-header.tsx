import { X } from "lucide-react";
import { Video } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { IconButton } from "@/components/ui/icon-button";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ChatHeader({ room }: { room: string }) {
    const { booking } = useAppSelector((state) => state.booking);
    const chat = booking.findIndex((b) => b.room === room);

    return (
        <Dialog>
            <div className="z-20 sticky top-0 bg-background border-b py-5 flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <AvatarWithFallback src={booking[chat]?.receiver?.image} />
                    <div className="space-y-1">
                        <h5 className="leading-none">{booking[chat]?.receiver?.name}</h5>
                        <h6 className="leading-none text-muted-foreground">{booking[chat]?.product}</h6>
                    </div>
                </div>
                <DialogTrigger asChild>
                    <IconButton>
                        <Video size={16} />
                    </IconButton>
                </DialogTrigger>
            </div>
            <DialogContent className="aspect-square flex justify-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem mollitia recusandae nostrum veritatis, et, vel magnam ut
                quas ex harum labore itaque doloremque fuga magni velit id libero, doloribus deserunt.
                <DialogClose asChild>
                    <IconButton variant="destructive" className="absolute bottom-6">
                        <X size={16} />
                    </IconButton>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
