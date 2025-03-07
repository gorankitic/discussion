// lib
import { Outlet, useNavigate } from "react-router";
// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/features/authentication/useUser";
import { useEffect } from "react";

const ProtectedLayout = () => {
    const navigate = useNavigate();
    const { user, isPending } = useUser();

    useEffect(() => {
        if (!user && !isPending) navigate("/signin");
    }, [user, isPending, navigate]);

    if (isPending) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <div className='size-16 animate-spin rounded-full border-b-4 border-blue-500'></div>
            </div>
        )
    }
    return (
        <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-5">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}
export default ProtectedLayout;