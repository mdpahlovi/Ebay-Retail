import { UserToken } from "@/types";
import { Booking, Message, User } from "@/types/data";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type BookingProps = { room: string; product: string; sender: User; receiver: User; messages: Message[]; notifications: Message[] };
const initialState: { booking: BookingProps[] } = { booking: [] };

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBooking: (state, action: PayloadAction<{ user: UserToken; booking: Booking }>) => {
            const { id, product, buyer, seller, messages } = action.payload.booking;

            state.booking.push({
                room: id,
                product: product.name,
                sender: action.payload.user?.role === "buyer" ? buyer : seller,
                receiver: action.payload.user?.role === "buyer" ? seller : buyer,
                messages,
                notifications: [],
            });
        },
        setMessage: (state, action: PayloadAction<{ room: string; message: Message }>) => {
            const room = state.booking.findIndex(({ room }) => room === action.payload.room);
            state.booking[room].messages.push(action.payload.message);
        },
        setNotification: (state, action: PayloadAction<{ room: string; message: Message }>) => {
            const room = state.booking.findIndex(({ room }) => room === action.payload.room);
            state.booking[room].notifications.push(action.payload.message);
        },
    },
});

export const { setBooking, setMessage, setNotification } = bookingSlice.actions;

export default bookingSlice.reducer;
