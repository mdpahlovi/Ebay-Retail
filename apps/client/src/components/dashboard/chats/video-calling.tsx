import ReactPlayer from "react-player";
import { useEffect, useRef } from "react";
import { Mic, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";

type VideoCallingProps = {
    room: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function VideoCalling({ room, open, setOpen }: VideoCallingProps) {
    const remoteVideoRef = useRef<MediaStream | null>(null);
    const currentVideoRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((value) => {
            currentVideoRef.current = value;
        });
    }, []);

    return (
        <DialogContent className="p-2 gap-2 max-w-5xl">
            <div className="bg-background aspect-video rounded">
                <ReactPlayer url={currentVideoRef.current || undefined} playing width="100%" height="100%" />
            </div>
            <div className="bg-background aspect-video rounded min-[512px]:w-60 sm:w-80 min-[512px]:fixed top-2 right-2">
                <ReactPlayer url={currentVideoRef.current || undefined} playing width="100%" height="100%" />
            </div>
            <div className="p-4 flex justify-center gap-4">
                <IconButton className="size-10">
                    <Mic size={20} />
                </IconButton>
                <IconButton className="size-10">
                    <Video size={20} />
                </IconButton>
                <Button variant="destructive" className="rounded-full">
                    <X size={20} />
                </Button>
            </div>
        </DialogContent>
    );
}
