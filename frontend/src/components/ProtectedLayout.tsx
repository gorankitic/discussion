// lib
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
// hooks
import { useUser } from "@/features/authentication/useUser";
// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const ProtectedLayout = () => {
    const navigate = useNavigate();
    const { user, isPending } = useUser();

    useEffect(() => {
        if (!user && !isPending) navigate("/signin");
    }, [user, isPending, navigate]);

    if (isPending) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <Loader className="size-16" />
            </div>
        )
    }
    return (
        <div className="flex flex-col min-h-screen max-w-5xl mx-auto px-5">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default ProtectedLayout;