// lib
import { Link } from "react-router";
// hooks
import { useUser } from "@/features/authentication/useUser";
// components
import UserButton from "./UserButton";
// icons
import { AudioLines, LogIn } from "lucide-react";

const Header = () => {
    const { user } = useUser();
    return (
        <nav className="flex items-center justify-between my-4">
            <Link to="/" className="flex gap-2 items-center">
                <AudioLines className="text-blue-500 size-6" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-transparent bg-clip-text">Discussion</h1>
            </Link>
            <section className="flex gap-4">
                {user ? (
                    <UserButton />
                ) : (
                    <Link to="/signin" className="flex items-center justify-center gap-1 hover:text-blue-500">
                        <LogIn className="size-4" />
                        Sign in
                    </Link>
                )}
            </section>
        </nav>
    )
}
export default Header;