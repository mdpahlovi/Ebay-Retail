import { useAppSelector } from "@/redux/hooks";
import DashboardLinks from "./navlinks";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { capitalizeFirstWord } from "@/lib/capitalizeFirstWord";
import LogoToggle from "@/components/logo-toggle";

export default function Sidebar() {
    const { user, isLoading } = useAppSelector((state) => state.user);

    return (
        <>
            <LogoToggle />
            <div className="flex justify-center my-8">
                {isLoading ? (
                    <div className="animate-pulse w-56 h-56 rounded-3xl bg-foreground/10"></div>
                ) : (
                    <img className="w-56 rounded-3xl" src={user?.avatar} alt="" />
                )}
            </div>
            <h3 className="text-3xl text-center font-bold">{user?.name}</h3>
            {!isLoading && user?.role ? (
                <p className="mb-6 text-center">{capitalizeFirstWord(user.role)}</p>
            ) : (
                <div className="animate-pulse w-10 h-4 mb-6 bg-foreground/10"></div>
            )}
            <div className="flex flex-col">
                <NavLink to="/dashboard" end>
                    {({ isActive }) => (
                        <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start">
                            Dashboard
                        </Button>
                    )}
                </NavLink>
                <DashboardLinks />
            </div>
        </>
    );
}
