import { HashLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="w-full h-[400px] flex justify-center items-center">
            <HashLoader color="#F48E00" size={100} />
        </div>
    );
}
