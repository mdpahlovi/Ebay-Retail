import { Link } from "react-router-dom";
import { Facebook, Linkedin, Mail } from "lucide-react";
import LogoToggle from "@/components/logo-toggle";

const links = [
    { title: "Product", children: ["Features", "Integrations", "Pricing", "FAQ"] },
    { title: "Company", children: ["Privacy", "Terms Condition"] },
    { title: "Developers", children: ["Public API", "Documentation", "Guides"] },
];

export default function Footer() {
    return (
        <footer className="mt-12 sm:mt-14 lg:mt-16 divide-y border-t">
            <section className="my-0 flex flex-col justify-between py-10 space-y-8 lg:flex-row lg:space-y-0">
                <LogoToggle />
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                    {links.map(({ title, children }, idx) => (
                        <div key={idx} className="space-y-3">
                            <h4 className="uppercase">{title}</h4>
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
                        <h4 className="uppercase">Social media</h4>
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
            </section>
            <div className="py-6 text-sm text-center">© 2022 Company Co. All rights reserved.</div>
        </footer>
    );
}
