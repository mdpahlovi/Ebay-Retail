import { gql } from "@apollo/client";

export const GET_ADVERTISE_PRODUCTS = gql`
    query {
        advertise {
            id
            image
            condition
            name
            isBooked
        }
    }
`;

export const GET_CATEGORIES = gql`
    query {
        categories {
            id
            name
            image
            total
        }
    }
`;

export const GET_PRODUCTS = gql`
    query category($id: ID!) {
        category(id: $id) {
            name
            products {
                name
                image
                location
                resale_price
                original_price
                purchase_date
                description
                condition
                seller {
                    name
                    image
                    isVerify
                }
                createdAt
                isBooked
            }
        }
    }
`;

export const GET_SELLER_PRODUCTS = gql`
    query {
        products {
            name
            image
            location
            resale_price
            original_price
            purchase_date
            description
            condition
            createdAt
            isBooked
        }
    }
`;
