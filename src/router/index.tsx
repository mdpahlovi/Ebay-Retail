import Main from "@/layout/main";
import Home from "@/pages/main/home";
import Categories from "@/pages/main/categories";
import Products from "@/pages/main/products";
import Contact from "@/pages/main/contact";
import Profile from "@/pages/auth/profile";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Dashboard from "@/layout/dashboard";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "@/pages/dashboard/home";
import Chats from "@/pages/dashboard/chats";
import Bookings from "@/pages/dashboard/bookings";
import EditBooking from "@/pages/dashboard/edit-booking";
import SellerRoute from "./SellerRoute";
import SellerProducts from "@/pages/dashboard/products";
import AddProduct from "@/pages/dashboard/add-product";
import EditProduct from "@/pages/dashboard/edit-product";
import AdminRoute from "./AdminRoute";
import AllBuyer from "@/pages/dashboard/all-buyer";
import AllSeller from "@/pages/dashboard/all-seller";
import EditUser from "@/pages/dashboard/edit-user";
import AddCategory from "@/pages/dashboard/add-category";
import PricingPage from "@/pages/main/pricing";
import NewsPage from "@/pages/main/news";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/categories",
                element: <Categories />,
            },
            {
                path: "/categories/:id",
                element: <Products />,
            },
            {
                path: "/pricing",
                element: <PricingPage />,
            },
            {
                path: "/news",
                element: <NewsPage />,
            },
            {
                path: "/contacts",
                element: <Contact />,
            },
            {
                path: "/profile",
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
        ],
    },
    { path: "*" },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            { path: "/dashboard", element: <DashboardHome /> },
            { path: "chats", element: <Chats /> },
            { path: "bookings", element: <Bookings /> },
            { path: "edit-booking/:id", element: <EditBooking /> },
            {
                path: "products",
                element: (
                    <SellerRoute>
                        <SellerProducts />
                    </SellerRoute>
                ),
            },
            {
                path: "add-product",
                element: (
                    <SellerRoute>
                        <AddProduct />
                    </SellerRoute>
                ),
            },
            {
                path: "edit-product/:id",
                element: (
                    <SellerRoute>
                        <EditProduct />
                    </SellerRoute>
                ),
            },

            {
                path: "all-buyer",
                element: (
                    <AdminRoute>
                        <AllBuyer />
                    </AdminRoute>
                ),
            },
            {
                path: "all-seller",
                element: (
                    <AdminRoute>
                        <AllSeller />
                    </AdminRoute>
                ),
            },
            {
                path: "edit-user/:id",
                element: (
                    <AdminRoute>
                        <EditUser />
                    </AdminRoute>
                ),
            },
            {
                path: "add-category",
                element: (
                    <AdminRoute>
                        <AddCategory />
                    </AdminRoute>
                ),
            },
        ],
    },
]);

export default router;
