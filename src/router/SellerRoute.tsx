import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

const SellerRoute = ({ children }: React.PropsWithChildren) => {
    const { user, loading } = useAppSelector((state) => state.user);

    if (!loading) {
        if (user && user?.id && user?.role === "seller") {
            return children;
        } else {
            return <Navigate to="/dashboard" />;
        }
    }
};

export default SellerRoute;
