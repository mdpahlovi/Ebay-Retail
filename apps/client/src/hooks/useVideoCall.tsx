import Peer from "peerjs";
import { socket } from "@/lib/socket";
import { useEffect, useRef, useState } from "react";

export function useVideoCall(room: string) {
    const [open, setOpen] = useState(false);
    const peerRef = useRef<Peer | null>(null);
    const [remotePeerId, setRemotePeerId] = useState("");
    const remoteVideoRef = useRef<MediaStream | null>(null);
    const currentVideoRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const peer = new Peer();
        peer.on("open", (peer) => socket.emit("remote:peer", { room, peer }));

        peer.on("call", (call) => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
                setOpen(true);
                currentVideoRef.current = mediaStream;

                call.answer(mediaStream);
                call.on("stream", (remoteStream) => (remoteVideoRef.current = remoteStream));
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
        if (remotePeerId) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
                setOpen(true);
                currentVideoRef.current = mediaStream;

                if (peerRef.current) {
                    const call = peerRef.current.call(remotePeerId, mediaStream);
                    call.on("stream", (remoteStream) => (remoteVideoRef.current = remoteStream));
                }
            });
        }
    };

    return { open, setOpen, handleCall, remoteVideoRef, currentVideoRef };
}
