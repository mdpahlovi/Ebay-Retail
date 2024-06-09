import { socket } from "@/lib/socket";
import ReactPlayer from "react-player";
import { Phone, X } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { AvatarWithFallback } from "@/components/ui/avatar";

type VideoCallingProps = { room: string; handleAnswer: () => void; handleEnd: (media: MediaStream | undefined) => void };

export function VideoCalling({ room, handleAnswer, handleEnd }: VideoCallingProps) {
    const { booking } = useAppSelector((state) => state.booking);
    const { callStage, remoteVideo, currentVideo } = useAppSelector((state) => state.video);

    const chat = booking.findIndex((b) => b.room === room);

    return (
        <DialogContent className="p-2 gap-2 max-w-5xl">
            <div className="relative bg-muted aspect-video rounded">
                <ReactPlayer url={remoteVideo} playing width="100%" height="100%" />
                {callStage === "sent" || callStage === "incoming" ? (
                    <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center gap-4">
                        <AvatarWithFallback src={booking[chat]?.receiver?.image} className="size-16" />
                        <h5 className="leading-none">
                            {booking[chat]?.receiver?.name + " "}
                            {(callStage === "sent" && "Calling") || (callStage === "incoming" && "Ringing")}
                        </h5>
                    </div>
                ) : null}
            </div>
            <div className="bg-muted aspect-video rounded min-[512px]:w-60 sm:w-80 min-[512px]:fixed top-2 right-2">
                <ReactPlayer url={currentVideo} playing width="100%" height="100%" />
            </div>
            <div className="p-4 flex justify-center gap-4">
                {callStage === "incoming" ? (
                    <Button onClick={handleAnswer} variant="success" className="rounded-full">
                        <Phone size={20} />
                    </Button>
                ) : null}
                <Button
                    variant="destructive"
                    className="rounded-full"
                    onClick={() => {
                        handleEnd(currentVideo);
                        socket.emit("call:end", { room });
                    }}
                >
                    <X size={20} />
                </Button>
            </div>
        </DialogContent>
    );
}
