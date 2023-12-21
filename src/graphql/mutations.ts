import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
    mutation createProduct(
        $category: String!
        $name: String!
        $image: String!
        $resale_price: Float!
        $original_price: Float!
        $condition: String!
        $description: String!
        $location: String!
        $purchase_date: String!
    ) {
        createProduct(
            category: $category
            name: $name
            image: $image
            resale_price: $resale_price
            original_price: $original_price
            condition: $condition
            description: $description
            location: $location
            purchase_date: $purchase_date
        ) {
            id
        }
    }
`;

export const CREATE_BOOKING = gql`
    mutation createBooking($date: String!, $location: String!, $seller: String!, $product: String!) {
        createBooking(date: $date, location: $location, seller: $seller, product: $product) {
            id
        }
    }
`;
