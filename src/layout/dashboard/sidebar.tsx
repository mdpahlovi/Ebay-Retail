/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useAppSelector } from "@/redux/hooks";
import DashboardLinks from "./navlinks";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import capitalizeFirstWord from "@/lib/capitalizeFirstWord";
import LogoToggle from "@/components/logo-toggle";
import { AvatarWithFallback } from "@/components/ui/avatar";

export default function Sidebar() {
    const { user } = useAppSelector((state) => state.user);

    return (
        <>
            <LogoToggle />
            <div className="flex justify-center my-8">
                <AvatarWithFallback src={user?.image!} className="w-56 h-56" />
            </div>
            <h3 className="text-3xl text-center font-bold">{user?.name}</h3>
            <p className="mb-6 text-center">{capitalizeFirstWord(user?.role)}</p>
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
