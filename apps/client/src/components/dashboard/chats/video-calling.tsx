import ReactPlayer from "react-player";
import { Mic, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";

type VideoCallingProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    remoteVideo: MediaStream | undefined;
    currentVideo: MediaStream | undefined;
    handleEndCall: () => void;
};

export function VideoCalling({ remoteVideo, currentVideo, handleEndCall }: VideoCallingProps) {
    return (
        <DialogContent className="p-2 gap-2 max-w-5xl">
            <div className="bg-muted aspect-video rounded">
                <ReactPlayer url={remoteVideo} playing width="100%" height="100%" />
            </div>
            <div className="bg-muted aspect-video rounded min-[512px]:w-60 sm:w-80 min-[512px]:fixed top-2 right-2">
                <ReactPlayer url={currentVideo} playing width="100%" height="100%" />
            </div>
            <div className="p-4 flex justify-center gap-4">
                <IconButton className="size-10">
                    <Mic size={20} />
                </IconButton>
                <IconButton className="size-10">
                    <Video size={20} />
                </IconButton>
                <Button onClick={handleEndCall} variant="destructive" className="rounded-full">
                    <X size={20} />
                </Button>
            </div>
        </DialogContent>
    );
}
