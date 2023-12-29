import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export const REGISTER = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password)
    }
`;

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

export const UPDATE_PRODUCT = gql`
    mutation updateProduct($id: ID!, $data: ProductInput!) {
        updateProduct(id: $id, data: $data) {
            id
        }
    }
`;

export const UPDATE_BOOKING = gql`
    mutation updateBooking($id: ID!, $data: BookingInput!) {
        updateBooking(id: $id, data: $data) {
            id
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($id: ID!, $data: UserInput!) {
        updateUser(id: $id, data: $data) {
            id
            role
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID!) {
        deleteProduct(id: $id) {
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

export const CREATE_MESSAGE = gql`
    mutation createMessage($id: ID!, $type: String!, $content: String!) {
        createMessage(id: $id, type: $type, content: $content) {
            id
        }
    }
`;

export const DELETE_BOOKING = gql`
    mutation deleteBooking($id: ID!) {
        deleteBooking(id: $id) {
            id
        }
    }
`;

export const CREATE_CATEGORY = gql`
    mutation createCategory($name: String!, $image: String!) {
        createCategory(name: $name, image: $image) {
            id
        }
    }
`;

export const SOCIAL_LOGIN = gql`
    mutation socialLogin($name: String!, $email: String!, $image: String!, $provider: String!) {
        socialLogin(name: $name, email: $email, image: $image, provider: $provider)
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation deleteCategory($id: ID!) {
        deleteCategory(id: $id) {
            id
        }
    }
`;

export const PROFILE = gql`
    mutation profile($name: String!, $phone: String!, $image: String, $address: String) {
        profile(name: $name, phone: $phone, image: $image, address: $address)
    }
`;

export const BECOMESELLER = gql`
    mutation becomeSeller($plan: String!, $name: String!, $phone: String!, $address: String!) {
        becomeSeller(plan: $plan, name: $name, phone: $phone, address: $address)
    }
`;

export const ADVERTISEPRODUCT = gql`
    mutation advertiseProduct($id: ID!, $advertised: Boolean!) {
        advertiseProduct(id: $id, advertised: $advertised) {
            id
        }
    }
`;
