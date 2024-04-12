import { Video } from "lucide-react";
import { socket } from "@/lib/socket";
import { peer } from "@/services/peer";
import { useCallback, useState } from "react";
import { VideoCalling } from "./video-calling";
import { useAppSelector } from "@/redux/hooks";
import { Dialog } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { AvatarWithFallback } from "@/components/ui/avatar";

export default function ChatHeader({ room }: { room: string }) {
    const { booking } = useAppSelector((state) => state.booking);
    const chat = booking.findIndex((b) => b.room === room);

    const [open, setOpen] = useState(false);
    const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        const offer = await peer.getOffer();

        socket.emit("Call", { room, offer });
        setMyStream(stream);
        setOpen(true);
    }, [room]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="z-20 sticky top-0 bg-background border-b py-5 flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <AvatarWithFallback src={booking[chat]?.receiver?.image} />
                    <div className="space-y-1">
                        <h5 className="leading-none">{booking[chat]?.receiver?.name}</h5>
                        <h6 className="leading-none text-muted-foreground">{booking[chat]?.product}</h6>
                    </div>
                </div>
                <IconButton onClick={handleCallUser}>
                    <Video size={16} />
                </IconButton>
            </div>
            <VideoCalling {...{ room, open, setOpen, myStream, setMyStream, remoteStream, setRemoteStream }} />
        </Dialog>
    );
}
