export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    role: string;
    address: string;
    isVerify: boolean;
    totalProduct: number;
    totalBooking: number;
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
    createdAt: string;
    updatedAt: string;
};

export type Message = {
    id: string;
    user: string;
    type: string;
    content: string;
    createdAt: string;
};

export type Booking = {
    id: string;
    date: string;
    location: string;
    buyer: User;
    seller: User;
    product: Product;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
};

export type Token = {
    token: string;
};

export type Article = {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};
