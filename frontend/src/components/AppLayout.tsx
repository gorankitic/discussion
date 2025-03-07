// lib
import { Outlet } from "react-router";
// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AppLayout = () => {
    return (
        <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-5">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}
export default AppLayout;