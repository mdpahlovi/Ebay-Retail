import { ScrollArea } from "@/components/ui/scroll-area";
import ChatHeader from "@/components/dashboard/chats/chat-header";
import ChatBody from "@/components/dashboard/chats/chat-body";
import ChatFooter from "@/components/dashboard/chats/chat-footer";

export default function Messages() {
    return (
        <ScrollArea className="px-6">
            <ChatHeader />
            <ChatBody />
            <ChatFooter />
        </ScrollArea>
    );
}
