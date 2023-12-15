import capitalizeFirstWord from "@/lib/capitalizeFirstWord";
import { useAppSelector } from "@/redux/hooks";

const DashboardHome = () => {
    const { user } = useAppSelector((state) => state.user);

    return (
        <div className="h-[calc(100vh_-_16rem)] flex flex-col justify-center items-center">
            <h1 className="text-6xl">Welcome To</h1>
            <div className="flex justify-center items-center text-base-content/50 mt-4">
                <h2>{capitalizeFirstWord(user?.role)} Dashboard</h2>
            </div>
        </div>
    );
};

export default DashboardHome;
