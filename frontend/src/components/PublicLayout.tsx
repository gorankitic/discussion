// lib
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
// hooks
import { useUser } from "@/features/authentication/useUser";

const PublicLayout = () => {
    const navigate = useNavigate();
    const { user, isPending } = useUser();

    useEffect(() => {
        if (user && !isPending) navigate("/");
    }, [user, isPending, navigate]);

    if (isPending) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <div className='size-16 animate-spin rounded-full border-b-4 border-blue-500'></div>
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