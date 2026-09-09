import Peer from "peerjs";
import { socket } from "@/lib/socket";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
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
    const currentVideoRef = useRef<MediaStream | undefined>(undefined);
    const [refresh, setRefresh] = useState<number>();
    const { remotePeerId, currentPeerId, currentVideo, remoteVideo } = useAppSelector((state) => state.video);

    // Keep the latest local stream reachable from stable event listeners.
    useEffect(() => {
        currentVideoRef.current = currentVideo;
    }, [currentVideo]);

    // Requests camera & microphone with user-friendly error handling:
    // toasts the reason, closes the call dialog, and rethrows for the caller's chain.
    const getUserMedia = useCallback(() => {
        const resetCallUi = () => {
            dispatch(setOpen(false));
            dispatch(setCallStage(null));
        };

        if (!navigator.mediaDevices?.getUserMedia) {
            toast.error("Video calling is not supported in this browser (HTTPS required).");
            resetCallUi();
            return Promise.reject(new Error("MediaDevicesUnsupported"));
        }

        return navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch((error: DOMException) => {
            const message =
                error.name === "NotAllowedError"
                    ? "Camera & microphone access was denied."
                    : error.name === "NotFoundError" || error.name === "OverconstrainedError"
                      ? "No camera or microphone was found."
                      : error.name === "NotReadableError"
                        ? "Your camera or microphone is already in use by another app."
                        : "Failed to access camera & microphone.";
            toast.error(message);
            resetCallUi();
            throw error;
        });
    }, [dispatch]);

    const handleEnd = useCallback((media: MediaStream | undefined) => {
        if (peerRef.current) {
            media ? media.getTracks().forEach((track) => track.stop()) : null;

            peerRef.current.destroy();

            dispatch(setOpen(false));
            dispatch(setCallStage(null));
            dispatch(setRemoteVideo(undefined));
            dispatch(setCurrentVideo(undefined));

            setRefresh(Math.random() * 100);
        }
    }, [dispatch]);

    useEffect(() => {
        const peer = new Peer();
        peer.on("open", (id) => dispatch(setCurrentPeerId(id)));

        peer.on("call", (call) => {
            getUserMedia().then((mediaStream) => {
                call.answer(mediaStream);
                call.on("stream", (remoteStream) => {
                    dispatch(setCallStage("answered"));
                    dispatch(setRemoteVideo(remoteStream));
                });
            });
        });

        peerRef.current = peer;
    }, [refresh, getUserMedia]);

    // Stable listeners: registered once, cleaned up with the same references,
    // and always reading the freshest stream via currentVideoRef.
    useEffect(() => {
        const onIncoming = ({ peerId }: { peerId: string }) => {
            dispatch(setOpen(true));
            dispatch(setRemotePeerId(peerId));
            dispatch(setCallStage("incoming"));
        };

        const onEnd = () => handleEnd(currentVideoRef.current);

        socket.on("call:incoming", onIncoming);
        socket.on("call:end", onEnd);

        return () => {
            socket.off("call:incoming", onIncoming);
            socket.off("call:end", onEnd);
        };
    }, [dispatch, handleEnd]);

    const handleCall = () => {
        if (remotePeerId || remoteVideo) {
            dispatch(setOpen(true));
        } else {
            getUserMedia().then((mediaStream) => {
                dispatch(setOpen(true));
                dispatch(setCallStage("sent"));
                dispatch(setCurrentVideo(mediaStream));

                if (currentPeerId) socket.emit("call:incoming", { room, peerId: currentPeerId });
            });
        }
    };

    const handleAnswer = () => {
        getUserMedia().then((mediaStream) => {
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

    return { handleCall, handleAnswer, handleEnd };
}
