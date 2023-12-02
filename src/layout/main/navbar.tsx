import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";
import NavLinks from "./navlinks";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import MenuToggle from "@/components/menu-toggle";

export default function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const { theme } = useAppSelector((state) => state.theme);

    return (
        <>
            <nav className="border-b">
                <div className="container h-20 flex justify-between items-center">
                    <Link to="/">
                        <img src={`/logo/${theme}-logo.png`} alt="" className="w-40 lg:w-48" />
                    </Link>
                    <div className="hidden lg:flex items-center gap-4">
                        <NavLinks icon />
                    </div>
                    <div className="flex gap-6">
                        <MenuToggle toggled={isOpen} toggle={setOpen} />
                        <Button className="hidden lg:block">Login / Register</Button>
                        <ModeToggle />
                    </div>
                </div>
            </nav>
            <div
                className={`mt-8 container border rounded-md py-8 flex flex-col gap-4 ${
                    isOpen ? "scale-y-100" : "scale-y-0"
                } transition-all origin-top duration-500 lg:hidden`}
            >
                <NavLinks />
                <Button className="w-max">Login / Register</Button>
            </div>
        </>
    );
}
