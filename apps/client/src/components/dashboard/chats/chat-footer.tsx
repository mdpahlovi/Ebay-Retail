import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { PulseLoader } from "react-spinners";
import { useAppDispatch } from "@/redux/hooks";
import { CREATE_MESSAGE } from "@/graphql/mutations";
import { setMessage } from "@/redux/features/booking/bookingSlice";

import ChatIcons from "./chat-icons";
import { socket } from "@/lib/socket";
import { Message } from "@/types/data";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import { SendHorizontal, Smile } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import ChatSpeechRecognition from "./speech-recognition";

export default function ChatFooter({ room }: { room: string }) {
    const dispatch = useAppDispatch();
    const [content, setContent] = useState("");
    const [typing, setTyping] = useState(false);
    const [createMessage] = useMutation(CREATE_MESSAGE);

    useEffect(() => {
        socket.on("typing", (status: boolean) => setTyping(status));
        socket.on("message", (message: Message) => dispatch(setMessage({ room, message })));
        return () => {
            socket.off("typing", (status: boolean) => setTyping(status));
            socket.off("message", (message: Message) => dispatch(setMessage({ room, message })));
        };
    }, [dispatch, room]);

    const handleSentMessage = () => {
        socket.emit("typing", { room, typing: false });
        const message = { id: room, type: "text", content };
        createMessage({ variables: message }).then(({ data: { createMessage } }) => {
            setContent("");
            if (createMessage) {
                dispatch(setMessage({ room, message: createMessage }));
                socket.emit("message", { room, message: createMessage });
            }
        });
    };

    return (
        <Popover>
            <div className="z-20 sticky bottom-0 bg-background border-t py-5">
                <div className="relative flex">
                    {typing && (
                        <div className="absolute -top-12">
                            <PulseLoader size={10} margin={4} color="#F48E00" />
                        </div>
                    )}
                    <ChatSpeechRecognition setContent={setContent} />
                    <Input
                        value={content}
                        className="pl-10 pr-[9.25rem]"
                        placeholder="Write Your Message!"
                        onChange={(e) => {
                            setContent(e.target.value);
                            socket.emit("typing", { room, typing: true });
                        }}
                        onBlur={() => socket.emit("typing", { room, typing: false })}
                        onKeyDown={(e) => e.key === "Enter" && content && handleSentMessage()}
                    />
                    <div className="absolute top-1 right-1 space-x-1">
                        <IconButton trigger>
                            <Smile size={16} />
                        </IconButton>
                        <IconButton variant="default" onClick={handleSentMessage} disabled={!content}>
                            <SendHorizontal size={16} />
                        </IconButton>
                    </div>
                </div>
            </div>
            <ChatIcons setContent={setContent} />
        </Popover>
    );
}
