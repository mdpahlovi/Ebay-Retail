import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="grid grid-col-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col md:justify-center space-y-4">
                <h1 className="md:whitespace-nowrap">
                    Sell Your <br />
                    Used Product! <br />
                    We here to help you.
                </h1>
                <p className="max-w-xl lg:max-w-[480px] pb-2">
                    Ebay Retail is bangladesh one of the best reseller website. Here you can buy & sell your used product. Get supper deal
                    by connect your seller.
                </p>
                <div className="flex flex-wrap items-center gap-5">
                    <Link to="/categories">
                        <Button>See Categories</Button>
                    </Link>
                </div>
            </div>
            <div className="lg:text-right mx-auto lg:ml-auto lg:mr-0 pb-6">
                <div className="relative inline-block z-10">
                    <img src="https://cdn.tailgrids.com/1.0/assets/images/hero/hero-image-01.png" alt="hero" className="max-w-full" />
                    <span className="absolute -left-8 -bottom-8 z-[-1]">
                        <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="2.5" r="2.5" fill="#F48E00" />
                            <circle cx="2.5" cy="24.5" r="2.5" fill="#F48E00" />
                            <circle cx="2.5" cy="46.5" r="2.5" fill="#F48E00" />
                            <circle cx="2.5" cy="68.5" r="2.5" fill="#F48E00" />
                            <circle cx="2.5" cy="90.5" r="2.5" fill="#F48E00" />
                            <circle cx="24.5" cy="2.5" r="2.5" fill="#F48E00" />
                            <circle cx="24.5" cy="24.5" r="2.5" fill="#F48E00" />
                            <circle cx="24.5" cy="46.5" r="2.5" fill="#F48E00" />
                            <circle cx="24.5" cy="68.5" r="2.5" fill="#F48E00" />
                            <circle cx="24.5" cy="90.5" r="2.5" fill="#F48E00" />
                            <circle cx="46.5" cy="2.5" r="2.5" fill="#F48E00" />
                            <circle cx="46.5" cy="24.5" r="2.5" fill="#F48E00" />
                            <circle cx="46.5" cy="46.5" r="2.5" fill="#F48E00" />
                            <circle cx="46.5" cy="68.5" r="2.5" fill="#F48E00" />
                            <circle cx="46.5" cy="90.5" r="2.5" fill="#F48E00" />
                            <circle cx="68.5" cy="2.5" r="2.5" fill="#F48E00" />
                            <circle cx="68.5" cy="24.5" r="2.5" fill="#F48E00" />
                            <circle cx="68.5" cy="46.5" r="2.5" fill="#F48E00" />
                            <circle cx="68.5" cy="68.5" r="2.5" fill="#F48E00" />
                            <circle cx="68.5" cy="90.5" r="2.5" fill="#F48E00" />
                            <circle cx="90.5" cy="2.5" r="2.5" fill="#F48E00" />
                            <circle cx="90.5" cy="24.5" r="2.5" fill="#F48E00" />
                            <circle cx="90.5" cy="46.5" r="2.5" fill="#F48E00" />
                            <circle cx="90.5" cy="68.5" r="2.5" fill="#F48E00" />
                            <circle cx="90.5" cy="90.5" r="2.5" fill="#F48E00" />
                        </svg>
                    </span>
                </div>
            </div>
        </section>
    );
}
