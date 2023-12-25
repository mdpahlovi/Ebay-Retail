import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthToken from "@/hooks/useAuthToken";

export default function UserNav({ mobile }: { mobile?: boolean }) {
    const { pathname } = useLocation();
    const isDashboard = pathname?.includes("dashboard");
    const { user } = useAppSelector((state) => state.user);
    const { logout } = useAuthToken();

    return (
        <div className={!isDashboard ? (mobile ? "lg:hidden" : "hidden lg:block") : ""}>
            {user?.id ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={user?.image} alt="" />
                            <AvatarFallback />
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align={mobile ? "start" : "end"} forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <Link to="/profile" className="flex flex-col space-y-1">
                                <h6 className="text-sm">{user?.name}</h6>
                                <p className="text-xs">{user?.email}</p>
                            </Link>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {isDashboard ? (
                                <Link to="/">
                                    <DropdownMenuItem>Home</DropdownMenuItem>
                                </Link>
                            ) : (
                                <Link to="/dashboard">
                                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                                </Link>
                            )}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="text-destructive focus:bg-destructive/10 cursor-pointer">
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link to="/login">
                    <Button>Login / Register</Button>
                </Link>
            )}
        </div>
    );
}
