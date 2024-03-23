export const typeDefs = `#graphql
    type User {
        id: ID
        name: String
        email: String
        phone: String
        image: String
        role: String
        address: String
        isVerify: Boolean
        plan: String
        totalProduct: Int
        totalBooking: Int
        createdAt: String
        updatedAt: String
    }

    type Category {
        id: ID
        name: String
        image: String
        total: Int
        products: [Product]
        createdAt: String
        updatedAt: String
    }

    type Product {
        id: ID
        category: Category
        name: String
        image: String
        resale_price: Float
        original_price: Float
        condition: String
        description: String
        location: String
        purchase_date: String
        seller: User
        advertised: Boolean
        isBooked: Boolean
        createdAt: String
        updatedAt: String
    }

    type Message{
        id: ID
        user: String
        type: String
        content: String
        createdAt: String
    }

    type Booking {
        id: ID
        date: String
        location: String
        buyer: User
        seller: User
        product: Product
        messages: [Message]
        createdAt: String
        updatedAt: String
    }

    type TotalData {
        _id: String
        totalCount: Int
        lastAddedAt: String
    }

    type Query {
        allBuyer: [User]
        allSeller: [User] 
        user(id: ID!): User 

        categories: [Category]
        category(id: ID!): Category

        products: [Product]
        product(id: ID!): Product
        advertise: [Product]

        bookings: [Booking]
        booking(id: ID!): Booking

        dashboard: [TotalData]
    }

    type Mutation {
        login(email: String!, password: String!): String
        register(name: String!, email: String!, password: String!): String
        socialLogin(name: String!, email: String!, image: String!, provider: String!): String
        profile(name: String!, phone: String!, image: String, address: String): String

        updateUser(id: ID!, data: UserInput!): User
        deleteUser(id: ID!): User
        becomeSeller(plan: String!, name: String!, phone: String!, address: String!): String

        createCategory(name: String!, image: String!): Category
        updateCategory(id: ID!, data: CategoryInput!): Category
        deleteCategory(id: ID!): Category

        createProduct(category: String!, name: String!, image: String!, resale_price: Float!, original_price: Float!, condition: String!, description: String!, location: String!, purchase_date: String!): Product
        updateProduct(id: ID!, data: ProductInput!): Product
        advertiseProduct(id: ID!, advertised: Boolean!): Product
        deleteProduct(id: ID!): Product

        createBooking(date: String!, location: String!, seller: String!, product: String!): Booking
        updateBooking(id: ID!, data: BookingInput!): Booking
        deleteBooking(id: ID!): Booking

        createMessage(id: ID!, type: String!, content: String!): Booking
    }

    type MessageCreated{
        id: ID
        message: Message 
    }

    type Subscription{
        messageCreated(id: ID!): MessageCreated
    }

    input UserInput{
        name: String
        phone: String
        image: String
        address: String
    }   

    input CategoryInput {
        name: String
        image: String
    }

    input ProductInput {
        category: String
        name: String
        image: String
        resale_price: Float
        original_price: Float
        condition: String
        description: String
        location: String
        purchase_date: String
    }

    input BookingInput {
        date: String 
        location: String
    }
`;
