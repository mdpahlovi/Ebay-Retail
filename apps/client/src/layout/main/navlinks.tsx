import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { MoreVertical } from "lucide-react";

const links = ["Home", "Categories", "Pricing", "News", "Contacts"];

export default function NavLinks({ icon }: { icon?: boolean }) {
    return links.map((link, idx) => {
        const home = link === "Home";

        return (
            <Fragment key={idx}>
                <NavLink
                    to={home ? "/" : link.toLowerCase()}
                    className={({ isActive }) =>
                        [
                            isActive ? "font-semibold text-primary tracking-wider" : "hover:text-primary hover:tracking-wider",
                            "text-sm transition-all",
                        ].join(" ")
                    }
                    end={home}
                >
                    {link}
                </NavLink>
                {icon && links.length !== idx + 1 ? <MoreVertical size={16} /> : ""}
            </Fragment>
        );
    });
}
