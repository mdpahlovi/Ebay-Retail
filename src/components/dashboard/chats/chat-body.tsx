import { useState } from "react";
import { Booking } from "@/types/data";
import { useAppSelector } from "@/redux/hooks";
import { useSubscription } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { MESSAGE_SUBSCRIPTION } from "@/graphql/subscription";
import { AvatarWithFallback } from "@/components/ui/avatar";

export default function ChatBody({ booking }: { booking: Booking }) {
    const [searchParams] = useSearchParams();
    const [messages, setMessages] = useState(booking.messages);
    const { data, loading } = useSubscription(MESSAGE_SUBSCRIPTION, { variables: { id: searchParams.get("room") } });

    const { user: auth_user } = useAppSelector((state) => state.user);
    const chat_user = auth_user?.role === "seller" ? booking.buyer : booking.seller;

    return (
        <div className="space-y-4 py-5 min-h-[calc(100vh_-_226px)]">
            {messages.map(({ id, user, content }) => {
                const right = auth_user?.id === user;
                const image = auth_user?.id === user ? auth_user.image : chat_user.image;

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
        </div>
    );
}
