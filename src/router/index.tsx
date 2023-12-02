import Main from "@/layout/main";
import Home from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

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
]);

export default router;
