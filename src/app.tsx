import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import router from "./router";
import { useEffect } from "react";
import auth from "./config/firebase.config";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { setTheme } from "./redux/features/theme/themeSlice";
import { setLoading, setUser } from "./redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export default function App() {
    const { theme } = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setLoading(true));

        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                axios.get(`/user/${user?.email}`).then((res) => {
                    dispatch(setUser(res.data));
                    dispatch(setLoading(false));
                });
            } else {
                dispatch(setLoading(false));
            }
        });
        return () => unSubscribe();
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
