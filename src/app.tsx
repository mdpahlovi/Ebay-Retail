import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import router from "./router";
import { useEffect } from "react";
import { UserToken } from "./types";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { setUser } from "./redux/features/users/userSlice";
import { setTheme } from "./redux/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Loader from "./components/ui/loader";

export default function App() {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector((state) => state.theme);
    const { loading } = useAppSelector((state) => state.user);

    useEffect(() => {
        axios.get("/refresh").then((res: { data: UserToken }) => dispatch(setUser(res.data)));
    }, [dispatch]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        if (!theme) {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            dispatch(setTheme(systemTheme));
            root.classList.add(systemTheme);
            return;
        }
        root.classList.add(theme);
    }, [dispatch, theme]);

    return (
        <>
            {loading ? <Loader app /> : <RouterProvider router={router} />}
            <ToastContainer position="top-right" autoClose={1500} theme={theme} />
        </>
    );
}
