import Main from "@/layout/main";
import Home from "@/pages/home";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Dashboard from "@/layout/dashboard";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "@/pages/dashboard/home";
import Bookings from "@/pages/dashboard/bookings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
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
        ],
    },
]);

export default router;
