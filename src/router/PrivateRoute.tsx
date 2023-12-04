import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import Loader from "@/components/ui/loader";

const PrivateRoute = ({ children }: React.PropsWithChildren) => {
    const location = useLocation();
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    if (user && user?._id) return children;

    return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
