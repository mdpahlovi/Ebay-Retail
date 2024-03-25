import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { CREATE_MESSAGE } from "@/graphql/mutations";

import ChatIcons from "./chat-icons";
import { socket } from "@/lib/socket";
import { Message } from "@/types/data";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import { SendHorizontal, Smile } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import ChatSpeechRecognition from "./speech-recognition";

export default function ChatFooter({ setMessages }: { setMessages: React.Dispatch<React.SetStateAction<Message[]>> }) {
    const [searchParams] = useSearchParams();
    const [content, setContent] = useState("");
    const [createMessage] = useMutation(CREATE_MESSAGE);

    useEffect(() => {
        const handleAddMessage = (data: Message) => {
            setMessages((previous) => [...previous, data]);
        };
        socket.on(searchParams.get("room")!, handleAddMessage);
        return () => {
            socket.off(searchParams.get("room")!, handleAddMessage);
        };
    }, [searchParams, setMessages]);

    const handleSentMessage = () => {
        const message = { id: searchParams.get("room"), type: "text", content };
        createMessage({ variables: message }).then(({ data: { createMessage } }) => {
            setContent("");
            if (createMessage) {
                setMessages((previous) => [...previous, createMessage]);
                socket.emit("new message", { room: searchParams.get("room"), message: createMessage });
            }
        });
    };

    return (
        <Popover>
            <div className="z-20 sticky bottom-0 bg-background border-t py-5">
                <div className="relative flex">
                    <ChatSpeechRecognition setContent={setContent} />
                    <Input
                        value={content}
                        className="pl-10 pr-[9.25rem]"
                        placeholder="Write Your Message!"
                        onChange={(e) => setContent(e.target.value)}
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
