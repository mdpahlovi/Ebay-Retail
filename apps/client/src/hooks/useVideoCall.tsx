import Peer from "peerjs";
import { socket } from "@/lib/socket";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export function useVideoCall(room: string) {
    const [open, setOpen] = useState(false);
    const peerRef = useRef<Peer | null>(null);
    const [remotePeerId, setRemotePeerId] = useState("");
    const [remoteVideo, setRemoteVideo] = useState<MediaStream>();
    const [currentVideo, setCurrentVideo] = useState<MediaStream>();

    useEffect(() => {
        const peer = new Peer();
        peer.on("open", (peer) => socket.emit("remote:peer", { room, peer }));

        peer.on("call", (call) => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
                setOpen(true);
                setCurrentVideo(mediaStream);

                call.answer(mediaStream);
                call.on("stream", (remoteStream) => setRemoteVideo(remoteStream));
            });
        });
        peerRef.current = peer;
    }, []);

    useEffect(() => {
        socket.on("remote:peer", ({ peer }) => setRemotePeerId(peer));

        return () => {
            socket.off("remote:peer", ({ peer }) => setRemotePeerId(peer));
        };
    }, []);

    const handleCall = () => {
        if (remotePeerId && !remoteVideo && !currentVideo) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
                setOpen(true);
                setCurrentVideo(mediaStream);

                if (peerRef.current) {
                    const call = peerRef.current.call(remotePeerId, mediaStream);
                    call.on("stream", (remoteStream) => setRemoteVideo(remoteStream));
                }
            });
        } else if (remotePeerId && remoteVideo && currentVideo) {
            setOpen(true);
        } else {
            toast.error("Oops! No Active User...!");
        }
    };

    const handleEndCall = () => {
        setOpen(false);
        if (peerRef.current) peerRef.current.destroy();
        if (currentVideo) currentVideo.getTracks().forEach((track) => track.readyState == "live" && track.stop());
    };

    return { open, setOpen, handleCall, handleEndCall, remoteVideo, currentVideo };
}
