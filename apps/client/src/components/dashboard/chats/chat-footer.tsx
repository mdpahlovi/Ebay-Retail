import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { PulseLoader } from "react-spinners";
import { CREATE_MESSAGE } from "@/graphql/mutations";

import ChatIcons from "./chat-icons";
import { socket } from "@/lib/socket";
import { Message } from "@/types/data";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import { SendHorizontal, Smile } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import ChatSpeechRecognition from "./speech-recognition";

export default function ChatFooter({ setMessages, room }: { setMessages: React.Dispatch<React.SetStateAction<Message[]>>; room: string }) {
    const [content, setContent] = useState("");
    const [typing, setTyping] = useState(false);
    const [createMessage] = useMutation(CREATE_MESSAGE);

    useEffect(() => {
        socket.on(`Typing: ${room}`, (data: boolean) => setTyping(data));
        socket.on(`Message: ${room}`, (data: Message) => setMessages((previous) => [...previous, data]));
        return () => {
            socket.off(`Typing: ${room}`, (data: boolean) => setTyping(data));
            socket.off(`Message: ${room}`, (data: Message) => setMessages((previous) => [...previous, data]));
        };
    }, [room, setMessages]);

    const handleSentMessage = () => {
        socket.emit("typing", { room, typing: false });
        const message = { id: room, type: "text", content };
        createMessage({ variables: message }).then(({ data: { createMessage } }) => {
            setContent("");
            if (createMessage) {
                setMessages((previous) => [...previous, createMessage]);
                socket.emit("new message", { room, message: createMessage });
            }
        });
    };

    console.log(typing);

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
                        onKeyDown={(e) => e.key === "Enter" && content && handleSentMessage()}
                    />
                    <div className="absolute top-1 right-1 space-x-1">
                        <IconButton trigger>
                            <Smile size={16} />
                        </IconButton>
                        <IconButton onClick={handleSentMessage} disabled={!content} message>
                            <SendHorizontal size={16} />
                        </IconButton>
                    </div>
                </div>
            </div>
            <ChatIcons setContent={setContent} />
        </Popover>
    );
}
