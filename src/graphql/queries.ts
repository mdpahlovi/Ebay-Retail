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
            seller {
                id
            }
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

export const GET_BOOKINGS = gql`
    query bookings {
        bookings {
            id
            date
            location
            buyer {
                id
                name
                email
                phone
                image
            }
            seller {
                id
                name
                email
                phone
                image
            }
            product {
                id
                name
                resale_price
                condition
            }
            createdAt
        }
    }
`;

export const GET_ALL_BUYER = gql`
    query allBuyer {
        allBuyer {
            id
            name
            email
            phone
            image
            isVerify
            totalBooking
            createdAt
        }
    }
`;

export const GET_ALL_SELLER = gql`
    query allSeller {
        allSeller {
            id
            name
            email
            phone
            image
            isVerify
            totalProduct
            totalBooking
            createdAt
        }
    }
`;
