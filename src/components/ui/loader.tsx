import { HashLoader } from "react-spinners";

export default function Loader({ app }: { app?: boolean }) {
    return (
        <div className={`${app ? "h-screen" : "h-[calc(100vh_-_80px)]"} flex justify-center items-center`}>
            <HashLoader color="#F48E00" size={100} />
        </div>
    );
}
