/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { NavLink } from "react-router-dom";

function links(role: string): string[] {
    switch (role) {
        case "admin":
            return ["All Buyer", "All Seller", "Add Category"];
        case "seller":
            return ["Chats", "Bookings", "Products", "Add Product"];
        default:
            return ["Chats", "Bookings"];
    }
}

export default function DashboardLinks() {
    const { user } = useAppSelector((state) => state.user);

    return links(user?.role!).map((link, idx) => (
        <NavLink key={idx} to={`/dashboard/${link.toLowerCase().replace(/\s+/g, "-")}`}>
            {({ isActive }) => (
                <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start">
                    {link}
                </Button>
            )}
        </NavLink>
    ));
}
