import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GET_BOOKING_MESSAGE } from "@/graphql/queries";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatBody from "@/components/dashboard/chats/chat-body";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ChatLoader from "@/components/dashboard/chats/chat-loader";
import ChatHeader from "@/components/dashboard/chats/chat-header";
import ChatFooter from "@/components/dashboard/chats/chat-footer";
import { setBooking } from "@/redux/features/booking/bookingSlice";
import { socket } from "@/lib/socket";

export default function Messages() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("room");

    const { data } = useQuery(GET_BOOKING_MESSAGE, { fetchPolicy: "no-cache", variables: { id } });
    const { user } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            socket.emit("join:room", { room: id, user: user.id });

            if (data?.booking) {
                dispatch(setBooking({ user, booking: data?.booking }));
                setTimeout(() => setLoading(false), 300);
            }
        }
    }, [data?.booking, dispatch, user]);

    if (!id || loading) return <ChatLoader />;

    return (
        <ScrollArea className="px-6">
            <ChatHeader room={id} />
            <ChatBody room={id} />
            <ChatFooter room={id} />
        </ScrollArea>
    );
}
