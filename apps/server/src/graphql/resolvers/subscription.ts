import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../context/index.js";

export const Subscription = {
    messageCreated: {
        subscribe: withFilter(
            () => pubsub.asyncIterator(["MESSAGE_CREATE"]),
            (payload, variables) => payload.messageCreated.id === variables.id
        ),
    },
};
