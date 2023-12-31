import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/redux/hooks";
import { Link, useSearchParams } from "react-router-dom";
import Advertise from "@/components/main/home/advertise";
import Category from "@/components/main/home/category";
import Hero from "@/components/main/home/hero";
import ServiceCard from "@/components/main/home/service-card";
import Pricing from "@/components/main/pricing";
import TopNews from "@/components/main/news";
import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/features/users/userSlice";

export default function Home() {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (token) {
            dispatch(setUser(jwtDecode(token)));
            localStorage.setItem("ebay-retail-token", token);
            searchParams.delete("token");
            setSearchParams(searchParams);
        }
    }, [token, dispatch, searchParams, setSearchParams]);

    return (
        <>
            <Hero />
            <Advertise />
            <Category />
            <section className="grid lg:grid-cols-2 gap-x-16 gap-y-10">
                <div className="space-y-4">
                    <h1>Why should you trust our services?</h1>
                    <p className="pb-2">
                        Choose from over 4,500 items that can be delivered to your doorstep. Order online and enjoy our Buyer Protection
                        program, which means that we’ll replace the item for FREE if it’s not as described in the ad!
                    </p>
                    <div className="flex items-center gap-6">
                        <Link to="/contacts">
                            <Button>Contact Us</Button>
                        </Link>
                        <Button variant="outline">Learn more</Button>
                    </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                    <ServiceCard stats={100} title="Customer Review" />
                    <ServiceCard stats={50} title="Product Sealed" />
                    <ServiceCard stats={60} title="Total Seller" />
                    <ServiceCard stats={20} title="Daily Customer" />
                </div>
            </section>
            <Pricing />
            <TopNews />
            <section className="bg-primary/10 px-10 py-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 rounded-lg">
                <div className="space-y-6">
                    <h1>Download it now</h1>
                    <p>Be part of millions people around the world using talus in modern User Interfaces.</p>
                    <div className="flex flex-wrap justify-center gap-4 md:justify-start lg:gap-6">
                        <img src="/icons/play_store_badge.png" className="w-36" alt="" />
                        <img src="/icons/app_store_badge.png" className="w-36" alt="" />
                    </div>
                </div>
                <img src="/mobility.webp" className="m-auto w-80" loading="lazy" alt="" />
            </section>
        </>
    );
}
