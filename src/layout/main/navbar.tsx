import { useState } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./navlinks";
import { Button } from "@/components/ui/button";
import LogoToggle from "@/components/logo-toggle";
import ModeToggle from "@/components/mode-toggle";
import MenuToggle from "@/components/menu-toggle";

export default function Navbar() {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <nav className="border-b">
                <section className="h-20 flex justify-between items-center">
                    <LogoToggle />
                    <div className="hidden lg:flex items-center gap-4">
                        <NavLinks icon />
                    </div>
                    <div className="flex gap-6">
                        <MenuToggle toggled={isOpen} toggle={setOpen} />
                        <Link to="/login" className="hidden lg:block">
                            <Button>Login / Register</Button>
                        </Link>
                        <ModeToggle />
                    </div>
                </section>
            </nav>
            <section
                className={`mt-8 border rounded-md py-8 flex flex-col gap-4 ${
                    isOpen ? "scale-y-100" : "scale-y-0"
                } transition-all origin-top duration-500 lg:hidden`}
            >
                <NavLinks />
                <Link to="/login">
                    <Button>Login / Register</Button>{" "}
                </Link>
            </section>
        </>
    );
}
