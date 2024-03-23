import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

export default function Main() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
