import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import Loader from "@/components/ui/loader";

const SellerRoute = ({ children }: React.PropsWithChildren) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    if (user && user?._id && user?.role === "seller") return children;

    return <Navigate to="/dashboard" />;
};

export default SellerRoute;
