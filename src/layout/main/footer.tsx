import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Mail } from "lucide-react";

const links = [
    { title: "Product", children: ["Features", "Integrations", "Pricing", "FAQ"] },
    { title: "Company", children: ["Privacy", "Terms Condition"] },
    { title: "Developers", children: ["Public API", "Documentation", "Guides"] },
];

export default function Footer() {
    const { theme } = useAppSelector((state) => state.theme);

    return (
        <footer className="divide-y border-t">
            <div className="container flex flex-col justify-between py-10 space-y-8 lg:flex-row lg:space-y-0">
                <Link to="/">
                    <img src={`/logo/${theme}-logo.png`} alt="" className="w-40 lg:w-48" />
                </Link>
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                    {links.map(({ title, children }, idx) => (
                        <div key={idx} className="space-y-3">
                            <h3 className="tracking-wide uppercase">{title}</h3>
                            <div className="flex flex-col space-y-1">
                                {children.map((link, idx) => (
                                    <Link key={idx} to="/">
                                        {link}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="space-y-3">
                        <div className="uppercase">Social media</div>
                        <div className="flex justify-start space-x-3 text-2xl">
                            <Link to="/" title="Facebook" className="flex items-center p-1">
                                <Facebook />
                            </Link>
                            <Link to="/" title="Twitter" className="flex items-center p-1">
                                <Linkedin />
                            </Link>
                            <Link to="/" title="Instagram" className="flex items-center p-1">
                                <Mail />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 text-sm text-center">© 2022 Company Co. All rights reserved.</div>
        </footer>
    );
}
