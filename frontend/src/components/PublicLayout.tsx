// lib
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
// hooks
import { useUser } from "@/features/authentication/useUser";
// components
import Loader from "@/components/Loader";

const PublicLayout = () => {
    const navigate = useNavigate();
    const { user, isPending } = useUser();

    useEffect(() => {
        if (user && !isPending) navigate("/");
    }, [user, isPending, navigate]);

    if (isPending) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <Loader className="size-16" />
            </div>
        )
    }

    if (!user) return (
        <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-5">
            <Outlet />
        </div>
    )
}

export default PublicLayout;