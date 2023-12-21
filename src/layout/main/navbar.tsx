import { useState } from "react";
import UserNav from "../user-nav";
import NavLinks from "./navlinks";
import LogoToggle from "@/components/logo-toggle";
import ModeToggle from "@/components/mode-toggle";
import MenuToggle from "@/components/menu-toggle";

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
            <section
                className={`fixed z-20 bg-background mt-8 border rounded-md py-8 flex flex-col gap-4 ${
                    isOpen ? "scale-y-100" : "scale-y-0"
                } transition-all origin-top duration-500 lg:hidden`}
            >
                <NavLinks />
                <UserNav mobile />
            </section>
        </>
    );
}
