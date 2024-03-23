import { Button } from "./ui/button";
import Hamburger from "hamburger-react";

export default function MenuToggle({ toggled, toggle }: { toggled: boolean; toggle: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <Button variant="outline" size="icon" className="lg:hidden">
            <div>
                <Hamburger size={20} toggled={toggled} toggle={toggle} />
            </div>
        </Button>
    );
}
