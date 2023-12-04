import { Navigate } from "react-router-dom";
import Loader from "@/components/ui/loader";
import { useAppSelector } from "@/redux/hooks";

const SellerRoute = ({ children }: React.PropsWithChildren) => {
    const { user, isLoading } = useAppSelector((state) => state.user);

    if (isLoading) return <Loader />;

    if (user && user?._id && user?.role === "seller") return children;

    return <Navigate to="/dashboard" />;
};

export default SellerRoute;
