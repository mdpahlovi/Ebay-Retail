import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

const AdminRoute = ({ children }: React.PropsWithChildren) => {
    const { user } = useAppSelector((state) => state.user);

    if (user && user?.id && user?.role === "admin") return children;

    return <Navigate to="/dashboard" />;
};

export default AdminRoute;
