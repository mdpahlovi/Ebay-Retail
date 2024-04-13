/* eslint-disable @typescript-eslint/ban-ts-comment */
import { X } from "lucide-react";
import { socket } from "@/lib/socket";
import { peer } from "@/services/peer";
import ReactPlayer from "react-player";
import { useCallback, useEffect } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { DialogClose, DialogContent } from "@/components/ui/dialog";

type VideoCallingProps = {
    room: string;
    open: boolean;
    myStream: MediaStream | null;
    remoteStream: MediaStream | null;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setMyStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
    setRemoteStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
};

export function VideoCalling({ room, setOpen, myStream, remoteStream, setMyStream, setRemoteStream }: VideoCallingProps) {
    const handleInComingCall = useCallback(
        async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            const ans = await peer.getAnswer(offer);

            socket.emit("Call:Accepted", { room, ans });
            setMyStream(stream);
            setOpen(true);
        },
        [room, setMyStream, setOpen]
    );

    const handleCallAccepted = useCallback(
        ({ ans }: { ans: RTCSessionDescriptionInit }) => {
            peer.setLocalDescription(ans);
            // @ts-ignore
            for (const track of myStream.getTracks()) {
                // @ts-ignore
                peer.peer.addTrack(track, myStream);
            }
        },
        [myStream]
    );

    const handleNegotiationNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("Negotiation:Need", { room, offer });
    }, [room]);

    useEffect(() => {
        // @ts-ignore
        peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
        return () => {
            // @ts-ignore
            peer.peer.removeEventListener("negotiationneeded", handleNegotiationNeeded);
        };
    }, [handleNegotiationNeeded]);

    const handleNegotiationIncoming = useCallback(
        async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
            const ans = await peer.getAnswer(offer);
            socket.emit("Negotiation:Done", { room, ans });
        },
        [room]
    );

    const handleNegotiationFinal = useCallback(async ({ ans }: { ans: RTCSessionDescriptionInit }) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        // @ts-ignore
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            setRemoteStream(remoteStream[0]);
        });
    }, [setRemoteStream]);

    useEffect(() => {
        socket.on(`${room}:Incoming:Call`, handleInComingCall);
        socket.on(`${room}:Call:Accepted`, handleCallAccepted);
        socket.on(`${room}:Negotiation:Need`, handleNegotiationIncoming);
        socket.on(`${room}:Negotiation:Done`, handleNegotiationFinal);

        return () => {
            socket.off(`${room}:Incoming:Call`, handleInComingCall);
            socket.off(`${room}:Call:Accepted`, handleCallAccepted);
            socket.off(`${room}:Negotiation:Need`, handleNegotiationIncoming);
            socket.off(`${room}:Negotiation:Done`, handleNegotiationIncoming);
        };
    }, [room, handleCallAccepted, handleInComingCall, handleNegotiationFinal, handleNegotiationIncoming]);

    return (
        <DialogContent className="aspect-square flex justify-center">
            {myStream ? <ReactPlayer playing width={300} height={300} url={myStream} /> : null}
            {remoteStream ? <ReactPlayer playing width={300} height={300} url={remoteStream} /> : null}
            <DialogClose asChild>
                <IconButton variant="destructive" className="absolute bottom-6">
                    <X size={16} />
                </IconButton>
            </DialogClose>
        </DialogContent>
    );
}
