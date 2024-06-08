import { Video } from "lucide-react";
import { VideoCalling } from "./video-calling";
import { Dialog } from "@/components/ui/dialog";
import { useVideoCall } from "@/hooks/useVideoCall";
import { IconButton } from "@/components/ui/icon-button";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { setOpen } from "@/redux/features/video/videoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function ChatHeader({ room }: { room: string }) {
    const { booking } = useAppSelector((state) => state.booking);

    const dispatch = useAppDispatch();
    const chat = booking.findIndex((b) => b.room === room);
    const open = useAppSelector((state) => state.video.open);
    const { handleCall, handleAnswer, handleEnd } = useVideoCall(room);

    return (
        <Dialog open={open} onOpenChange={(value) => dispatch(setOpen(value))}>
            <div className="z-20 sticky top-0 bg-background border-b py-5 flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <AvatarWithFallback src={booking[chat]?.receiver?.image} />
                    <div className="space-y-1">
                        <h5 className="leading-none">{booking[chat]?.receiver?.name}</h5>
                        <h6 className="leading-none text-muted-foreground">{booking[chat]?.product}</h6>
                    </div>
                </div>
                <IconButton onClick={handleCall}>
                    <Video size={16} />
                </IconButton>
            </div>
            <VideoCalling {...{ room, handleAnswer, handleEnd }} />
        </Dialog>
    );
}
