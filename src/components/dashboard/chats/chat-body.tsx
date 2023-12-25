import { AvatarWithFallback } from "@/components/ui/avatar";

export default function ChatBody() {
    return (
        <div className="space-y-4 py-5">
            <ChatBubble />
            <ChatBubble right />
            <ChatBubble />
            <ChatBubble right />
            <ChatBubble />
            <ChatBubble right />
            <ChatBubble />
            <ChatBubble right />
            <ChatBubble />
            <ChatBubble right />
            <ChatBubble />
            <ChatBubble right />
            <ChatBubble />
            <ChatBubble right />
        </div>
    );
}

function ChatBubble({ right }: { right?: boolean }) {
    return (
        <div className={`flex items-end ${right ? "flex-row-reverse" : "flex-row"} gap-2`}>
            <AvatarWithFallback
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                className="w-8 h-8"
            />
            <p className={`max-w-lg text-sm px-4 py-2 ${right ? "rounded-br-none bg-muted" : "rounded-bl-none bg-primary/10"} rounded-lg`}>
                Yes, I have a mac. I never had issues with root permission as well, but this helped me to solve the problem
            </p>
        </div>
    );
}
