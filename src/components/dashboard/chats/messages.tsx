import { useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BOOKING_MESSAGE } from "@/graphql/queries";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatLoader from "@/components/dashboard/chats/chat-loader";
import ChatHeader from "@/components/dashboard/chats/chat-header";
import ChatBody from "@/components/dashboard/chats/chat-body";
import ChatFooter from "@/components/dashboard/chats/chat-footer";

export default function Messages() {
    const [searchParams] = useSearchParams();
    const { data, loading } = useQuery(GET_BOOKING_MESSAGE, { fetchPolicy: "no-cache", variables: { id: searchParams.get("room") } });

    if (loading) return <ChatLoader />;

    return (
        <ScrollArea className="px-6">
            <ChatHeader booking={data.booking} />
            <ChatBody booking={data.booking} />
            <ChatFooter />
        </ScrollArea>
    );
}
