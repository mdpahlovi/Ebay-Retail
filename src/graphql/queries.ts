import { gql } from "@apollo/client";

export const GET_ADVERTISE_PRODUCTS = gql`
    query advertise {
        advertise {
            id
            name
            image
            condition
            resale_price
            original_price
        }
    }
`;

export const GET_CATEGORIES = gql`
    query categories {
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
                id
                name
                image
                location
                resale_price
                original_price
                purchase_date
                description
                condition
                seller {
                    id
                    name
                    image
                    isVerify
                }
                createdAt
            }
        }
    }
`;

export const GET_SELLER_PRODUCTS = gql`
    query products {
        products {
            id
            name
            location
            resale_price
            original_price
            purchase_date
            condition
            createdAt
        }
    }
`;
