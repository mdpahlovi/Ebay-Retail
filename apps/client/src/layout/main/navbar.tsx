import { useState } from "react";
import UserNav from "../user-nav";
import NavLinks from "./navlinks";
import LogoToggle from "@/components/logo-toggle";
import ModeToggle from "@/components/mode-toggle";
import MenuToggle from "@/components/menu-toggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <nav className="sticky-nav">
                <section className="my-0 h-20 flex justify-between items-center">
                    <LogoToggle />
                    <div className="hidden lg:flex items-center gap-4">
                        <NavLinks icon />
                    </div>
                    <div className="flex items-center gap-6">
                        <UserNav />
                        <MenuToggle toggled={isOpen} toggle={setOpen} />
                        <ModeToggle />
                    </div>
                </section>
            </nav>
            <nav
                className={cn(
                    isOpen ? "scale-y-100" : "scale-y-0",
                    "fixed w-full z-20 bg-background border-b transition-all origin-top duration-300"
                )}
            >
                <div className="container flex flex-col gap-4 py-8 lg:hidden">
                    <NavLinks />
                    <UserNav mobile />
                </div>
            </nav>
        </>
    );
}
