import { useEffect, useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { AvatarWithFallback } from "@/components/ui/avatar";

export default function ChatBody({ room }: { room: string }) {
    const viewRef = useRef<HTMLDivElement | null>(null);
    const { booking } = useAppSelector((state) => state.booking);
    const chat = booking.findIndex((b) => b.room === room);

    useEffect(() => {
        if (viewRef.current) viewRef.current.scrollIntoView({ behavior: "smooth" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [booking[chat].messages]);

    return (
        <div className="space-y-4 py-5 min-h-[calc(100vh_-_226px)]">
            {booking[chat].messages.map(({ id, user, content }) => {
                const right = booking[chat].sender.id === user;
                const image = booking[chat].sender.id === user ? booking[chat].sender.image : booking[chat].receiver.image;

                return (
                    <div key={id} className={`flex items-end ${right ? "flex-row-reverse" : "flex-row"} gap-2`}>
                        <AvatarWithFallback src={image} className="w-8 h-8" />
                        <p
                            className={`max-w-lg text-sm px-4 py-2 rounded-lg ${
                                right ? "rounded-br-none bg-muted" : "rounded-bl-none bg-primary/10"
                            }`}
                        >
                            {content}
                        </p>
                    </div>
                );
            })}
            <div ref={viewRef} />
        </div>
    );
}
