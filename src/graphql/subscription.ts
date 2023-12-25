import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
    subscription onMessageCreated($id: ID!) {
        onMessageCreated(id: $id) {
            id
            user
            type
            content
            createdAt
        }
    }
`;
