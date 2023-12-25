import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Mic, Paperclip, SendHorizontal, Smile } from "lucide-react";

export default function ChatFooter() {
    return (
        <div className="z-20 sticky bottom-0 bg-background border-t py-5">
            <div className="relative flex">
                <div className="absolute top-1 left-1">
                    <IconButton>
                        <Mic size={16} />
                    </IconButton>
                </div>
                <Input placeholder="Write Your Message!" className="pl-10 pr-[9.25rem]" />
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
                    <IconButton message>
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
