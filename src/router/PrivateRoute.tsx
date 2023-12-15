import { useAppSelector } from "@/redux/hooks";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: React.PropsWithChildren) => {
    const { pathname } = useLocation();
    const { user } = useAppSelector((state) => state.user);

    if (user && user?.id) return children;

    return <Navigate to="/login" state={{ from: pathname }} replace />;
};

export default PrivateRoute;
