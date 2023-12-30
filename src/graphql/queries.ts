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
            isBooked
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
            createdAt
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
                isBooked
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
            advertised
            isBooked
            createdAt
        }
    }
`;

export const GET_PRODUCT = gql`
    query product($id: ID!) {
        product(id: $id) {
            id
            category {
                id
                name
            }
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
            isBooked
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

export const GET_BOOKING_MESSAGE = gql`
    query booking($id: ID!) {
        booking(id: $id) {
            id
            date
            location
            buyer {
                id
                name
                image
            }
            seller {
                id
                name
                image
            }
            product {
                name
            }
            messages {
                id
                user
                type
                content
                createdAt
            }
            createdAt
        }
    }
`;

export const GET_BOOKING = gql`
    query booking($id: ID!) {
        booking(id: $id) {
            id
            date
            location
            product {
                name
            }
        }
    }
`;

export const GET_USER = gql`
    query user($id: ID!) {
        user(id: $id) {
            id
            name
            email
            phone
            image
            role
            address
            isVerify
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
            address
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
            address
            isVerify
            plan
            totalProduct
            totalBooking
            createdAt
        }
    }
`;

export const DASHBOARD = gql`
    query dashboard {
        dashboard {
            _id
            totalCount
            lastAddedAt
        }
        categories {
            name
            total
        }
        bookings {
            id
            product {
                name
                image
            }
            createdAt
        }
    }
`;
