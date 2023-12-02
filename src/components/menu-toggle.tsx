import { Button } from "./ui/button";
import Hamburger from "hamburger-react";

export default function MenuToggle({ toggled, toggle }: { toggled: boolean; toggle: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <Button variant="outline" size="icon" className="lg:hidden">
            <button>
                <Hamburger size={20} toggled={toggled} toggle={toggle} />
            </button>
        </Button>
    );
}
