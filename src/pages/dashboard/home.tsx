import { capitalizeFirstWord } from "@/lib/capitalizeFirstWord";
import { useAppSelector } from "@/redux/hooks";

const DashboardHome = () => {
    const { user, isLoading } = useAppSelector((state) => state.user);

    return (
        <div className="h-[calc(100vh_-_16rem)] flex flex-col justify-center items-center">
            <p className="text-6xl font-bold">Welcome To</p>
            <div className="flex justify-center items-center text-base-content/50 mt-4">
                {!isLoading && user?.role ? (
                    <p className="text-3xl font-medium">{capitalizeFirstWord(user.role)} Dashboard</p>
                ) : (
                    <div className="animate-pulse w-60 h-8 bg-base-content/10 mt-2"></div>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;
