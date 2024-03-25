import Booking from "../../../models/booking/index.js";
import { Context } from "../../../types/index.js";

interface Message {
    id: string;
    type: "text" | "image" | "audio";
    content: string;
}

export const MessageMutation = {
    createMessage: async (parent: any, { id, type, content }: Message, { token }: Context) => {
        const result = await Booking.findByIdAndUpdate(id, { $push: { messages: { user: token?.id, type, content } } }, { new: true });

        const newMessage = result.messages[result.messages.length - 1];
        console.log(newMessage);

        return result;
    },
};
