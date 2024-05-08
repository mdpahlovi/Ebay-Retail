import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigateWithState } from "./useNavigator";
import { setUser } from "@/redux/features/users/userSlice";

export function useAuthToken() {
    const dispatch = useAppDispatch();
    const { navigateFrom } = useNavigateWithState();

    const loginUser = (token?: string) => {
        if (token) {
            localStorage.setItem("ebay-retail-token", token);
            dispatch(setUser(jwtDecode(token)));
            navigateFrom();
        } else {
            toast.error("Login Failed");
            dispatch(setUser(null));
        }
    };

    const updateProfile = (token?: string) => {
        if (token) {
            localStorage.setItem("ebay-retail-token", token);
            dispatch(setUser(jwtDecode(token)));
        } else {
            toast.error("Failed To Update");
        }
    };

    const logout = () => {
        localStorage.removeItem("ebay-retail-token");
        dispatch(setUser(null));
    };

    return { loginUser, updateProfile, logout };
}
