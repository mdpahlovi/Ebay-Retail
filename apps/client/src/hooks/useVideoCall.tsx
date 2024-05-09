import Peer from "peerjs";
import { socket } from "@/lib/socket";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    setOpen,
    setCallStage,
    setRemotePeerId,
    setRemoteVideo,
    setCurrentVideo,
    setCurrentPeerId,
} from "@/redux/features/video/videoSlice";

export function useVideoCall(room: string) {
    const dispatch = useAppDispatch();
    const peerRef = useRef<Peer | null>(null);
    const { remotePeerId, currentPeerId } = useAppSelector((state) => state.video);

    useEffect(() => {
        const peer = new Peer();
        peer.on("open", (id) => dispatch(setCurrentPeerId(id)));

        peer.on("call", (call) => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
                call.answer(mediaStream);
                call.on("stream", (remoteStream) => {
                    dispatch(setCallStage("answered"));
                    dispatch(setRemoteVideo(remoteStream));
                });
            });
        });

        peerRef.current = peer;
    }, []);

    useEffect(() => {
        socket.on("call:incoming", ({ peerId }) => {
            dispatch(setOpen(true));
            dispatch(setRemotePeerId(peerId));
            dispatch(setCallStage("incoming"));
        });

        return () => {
            socket.off("call:incoming", ({ peerId }) => {
                dispatch(setOpen(true));
                dispatch(setRemotePeerId(peerId));
                dispatch(setCallStage("incoming"));
            });
        };
    }, []);

    const handleCall = () => {
        if (remotePeerId) {
            dispatch(setOpen(true));
        } else {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
                dispatch(setOpen(true));
                dispatch(setCallStage("sent"));
                dispatch(setCurrentVideo(mediaStream));

                if (currentPeerId) socket.emit("call:incoming", { room, peerId: currentPeerId });
            });
        }
    };

    const handleAnswer = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
            dispatch(setCurrentVideo(mediaStream));
            if (peerRef.current && remotePeerId) {
                const call = peerRef.current.call(remotePeerId, mediaStream);

                call.on("stream", (remoteStream) => {
                    dispatch(setCallStage("answered"));
                    dispatch(setRemoteVideo(remoteStream));
                });
            }
        });
    };

    return { handleCall, handleAnswer };
}
