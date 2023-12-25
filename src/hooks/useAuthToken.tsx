import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { setUser } from "@/redux/features/users/userSlice";
import { toast } from "react-toastify";
import useNavigateWithState from "./useNavigator";

export default function useAuthToken() {
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
            toast.error("Profile Update Failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("ebay-retail-token");
        dispatch(setUser(null));
    };

    return { loginUser, updateProfile, logout };
}
