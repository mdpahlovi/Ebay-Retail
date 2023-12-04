import { useAppSelector } from "@/redux/hooks";

export default function Home() {
    const { user } = useAppSelector((state) => state.user);
    console.log(user);
    return <div>This is Home</div>;
}
