export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    role: string;
    isVerify: boolean;
    products: Product[];
    bookings: Booking[];
    createdAt: string;
    updatedAt: string;
};

export type Category = {
    id: string;
    name: string;
    image: string;
    total: number;
    products: Product[];
    createdAt: string;
    updatedAt: string;
};

export type Product = {
    id: string;
    category: Category;
    name: string;
    image: string;
    resale_price: number;
    original_price: number;
    condition: string;
    description: string;
    location: string;
    purchase_date: string;
    seller: User;
    advertised: boolean;
    isBooked: boolean;
    booking: Booking;
    createdAt: string;
    updatedAt: string;
};

export type Booking = {
    date: string;
    location: string;
    buyer: User;
    seller: User;
    product: Product;
    createdAt: string;
    updatedAt: string;
};

export type Token = {
    token: string;
};
