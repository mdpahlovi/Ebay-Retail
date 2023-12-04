import Loader from "@/components/ui/loader";
import { useAppSelector } from "@/redux/hooks";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: React.PropsWithChildren) => {
    const { pathname } = useLocation();
    const { user, isLoading } = useAppSelector((state) => state.user);

    if (isLoading) return <Loader />;

    if (user && user?._id) return children;

    return <Navigate to="/login" state={{ from: pathname }} replace />;
};

export default PrivateRoute;
