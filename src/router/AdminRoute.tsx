import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import Loader from "@/components/ui/loader";

const AdminRoute = ({ children }: React.PropsWithChildren) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    if (user && user?._id && user?.role === "admin") return children;

    return <Navigate to="/dashboard" />;
};

export default AdminRoute;
