import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
    subscription messageCreated($id: ID!) {
        messageCreated(id: $id) {
            id
            message {
                id
                user
                type
                content
                createdAt
            }
        }
    }
`;
