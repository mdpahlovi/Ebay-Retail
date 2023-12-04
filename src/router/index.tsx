import Main from "@/layout/main";
import Home from "@/pages/home";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Dashboard from "@/layout/dashboard";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

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
    },
]);

export default router;
