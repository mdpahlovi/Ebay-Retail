import { useQuery } from "@apollo/client";
import { GET_BOOKINGS } from "@/graphql/queries";
import { useSearchParams } from "react-router-dom";
import Loader from "@/components/ui/loader";
import ChatSidebar from "@/components/dashboard/chats/chat-sidebar";
import Messages from "@/components/dashboard/chats/messages";

export default function ChatUI() {
    const [searchParams] = useSearchParams();
    const { data, loading } = useQuery(GET_BOOKINGS, { fetchPolicy: "no-cache" });

    if (loading) return <Loader />;

    return (
        <div className="-mx-6 -my-5 h-[calc(100vh_-_4rem)] grid md:grid-cols-[16rem_1fr] xl:grid-cols-[20rem_1fr]">
            <ChatSidebar bookings={data.bookings} />
            {searchParams.get("room") ? (
                <Messages />
            ) : (
                <div className="px-6 hidden flex-col items-center justify-center text-center md:flex">
                    <img src="/icons/chat_bubble.png" alt="" className="w-32 mb-4" />
                    <h4>No Booking Selected!</h4>
                    <p>
                        Please, Select a booking to start chatting.
                        <br className="hidden sm:block" /> Hope, your chat experience feel good.
                    </p>
                </div>
            )}
        </div>
    );
}
