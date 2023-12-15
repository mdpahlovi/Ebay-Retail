import "react-toastify/dist/ReactToastify.css";

import router from "./router";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { setUser } from "./redux/features/users/userSlice";
import { getCookies } from "./lib/cookies";
import decodeToken from "./lib/decodeToken";
import { setTheme } from "./redux/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export default function App() {
    const { theme } = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = getCookies();
        dispatch(setUser(decodeToken(token!)));
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
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer position="top-right" autoClose={1500} theme={theme} />
        </>
    );
}
