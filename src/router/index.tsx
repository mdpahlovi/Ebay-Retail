import Main from "@/layout/main";
import Home from "@/pages/main/home";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Dashboard from "@/layout/dashboard";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "@/pages/dashboard/home";
import Bookings from "@/pages/dashboard/bookings";
import Categories from "@/pages/main/categories";
import Products from "@/pages/main/products";
import AddProduct from "@/pages/dashboard/add-product";
import SellerRoute from "./SellerRoute";
import SellerProducts from "@/pages/dashboard/products";
import AdminRoute from "./AdminRoute";
import AllBuyer from "@/pages/dashboard/all-buyer";
import AllSeller from "@/pages/dashboard/all-seller";
import AddCategory from "@/pages/dashboard/add-category";
import Contact from "@/pages/main/contact";

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
                path: "/contacts",
                element: <Contact />,
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
            { path: "bookings", element: <Bookings /> },
            {
                path: "add-product",
                element: (
                    <SellerRoute>
                        <AddProduct />
                    </SellerRoute>
                ),
            },
            {
                path: "products",
                element: (
                    <SellerRoute>
                        <SellerProducts />
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
