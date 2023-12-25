import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { CREATE_MESSAGE } from "@/graphql/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Mic, Paperclip, SendHorizontal, Smile } from "lucide-react";

export default function ChatFooter() {
    const [searchParams] = useSearchParams();
    const [content, setContent] = useState("");
    const [createMessage] = useMutation(CREATE_MESSAGE);

    const handleSentMessage = () => {
        const message = { id: searchParams.get("room"), type: "text", content };
        createMessage({ variables: message }).then(() => setContent(""));
    };

    return (
        <div className="z-20 sticky bottom-0 bg-background border-t py-5">
            <div className="relative flex">
                <div className="absolute top-1 left-1">
                    <IconButton>
                        <Mic size={16} />
                    </IconButton>
                </div>
                <Input
                    value={content}
                    className="pl-10 pr-[9.25rem]"
                    placeholder="Write Your Message!"
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="absolute top-1 right-1 space-x-1">
                    <IconButton>
                        <Paperclip size={16} />
                    </IconButton>
                    <IconButton>
                        <Camera size={16} />
                    </IconButton>
                    <IconButton>
                        <Smile size={16} />
                    </IconButton>
                    <IconButton onClick={handleSentMessage} message>
                        <SendHorizontal size={16} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

function IconButton({ children, onClick, message }: { children: React.ReactNode; onClick?: () => void; message?: boolean }) {
    return (
        <Button variant={message ? "default" : "outline"} size="icon" className="w-8 h-8 rounded-full" onClick={onClick}>
            {children}
        </Button>
    );
}
