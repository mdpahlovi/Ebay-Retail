import { useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BOOKING_MESSAGE } from "@/graphql/queries";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatLoader from "@/components/dashboard/chats/chat-loader";
import ChatHeader from "@/components/dashboard/chats/chat-header";
import ChatBody from "@/components/dashboard/chats/chat-body";
import ChatFooter from "@/components/dashboard/chats/chat-footer";
import { useEffect, useState } from "react";
import { Message } from "@/types/data";
import { useAppSelector } from "@/redux/hooks";

export default function Messages() {
    const [searchParams] = useSearchParams();
    const { data, loading } = useQuery(GET_BOOKING_MESSAGE, { fetchPolicy: "no-cache", variables: { id: searchParams.get("room") } });

    const [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => data?.booking?.messages && setMessages(data.booking.messages), [data?.booking?.messages]);

    const { user: auth_user } = useAppSelector((state) => state.user);
    const chat_user = auth_user?.role === "seller" ? data?.booking?.buyer : data?.booking?.seller;

    if (loading) return <ChatLoader />;

    return (
        <ScrollArea className="px-6">
            <ChatHeader chat_user={chat_user} product_name={data?.booking?.product?.name} />
            <ChatBody auth_user={auth_user} chat_user={chat_user} messages={messages} />
            <ChatFooter setMessages={setMessages} />
        </ScrollArea>
    );
}
