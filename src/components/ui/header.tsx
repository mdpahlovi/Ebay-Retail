import { capitalizeFirstWord } from "@/lib/capitalizeFirstWord";
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Header({ title, last }: { title: string; last?: string }) {
    const params = useParams();
    const { pathname } = useLocation();

    let path = pathname;
    if (params?.id) path = pathname.replace(`/${params.id}`, "");

    return (
        <div className="bg-header bg-overly text-white">
            <div className="container space-y-4 py-24">
                <h1>{title}</h1>
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2 hover:text-primary hover:underline">
                        <Home size={12} className="-mt-0.5" />
                        Home
                    </Link>
                    <ChevronRight size={20} />
                    <Link to={path} className={last ? "hover:text-primary hover:underline" : "text-primary underline"}>
                        {capitalizeFirstWord(path.slice(1))}
                    </Link>
                    {last ? (
                        <>
                            <ChevronRight size={20} />
                            <Link to={pathname} className="text-primary underline">
                                {last}
                            </Link>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
