import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

const SellerRoute = ({ children }: React.PropsWithChildren) => {
    const { user } = useAppSelector((state) => state.user);

    if (user && user?.id && user?.role === "seller") return children;

    return <Navigate to="/dashboard" />;
};

export default SellerRoute;
