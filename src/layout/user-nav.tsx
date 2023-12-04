import { Link, useLocation } from "react-router-dom";
import auth from "@/config/firebase.config";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { setUser } from "@/redux/features/users/userSlice";

export default function UserNav({ mobile }: { mobile?: boolean }) {
    const { pathname } = useLocation();
    const isDashboard = pathname?.includes("dashboard");
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const handleLogout = () => signOut(auth).then(() => dispatch(setUser(null)));

    return (
        <div className={!isDashboard ? (mobile ? "lg:hidden" : "hidden lg:block") : ""}>
            {user?._id ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={user?.avatar} alt="" />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align={mobile ? "start" : "end"} forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm">{user?.name}</p>
                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                            </div>
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
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        >
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
