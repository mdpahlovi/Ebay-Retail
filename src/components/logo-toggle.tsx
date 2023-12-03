import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";

export default function LogoToggle({ className }: { className?: string }) {
    const { theme } = useAppSelector((state) => state.theme);

    return (
        <Link to="/" className={className}>
            <img src={`/logo/${theme}-logo.png`} alt="" className="w-40 lg:w-48" />
        </Link>
    );
}
