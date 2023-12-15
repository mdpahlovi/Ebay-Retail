import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

const AdminRoute = ({ children }: React.PropsWithChildren) => {
    const { user, loading } = useAppSelector((state) => state.user);

    if (!loading) {
        if (user && user?.id && user?.role === "admin") {
            return children;
        } else {
            return <Navigate to="/dashboard" />;
        }
    }
};

export default AdminRoute;
