
// hooks
import { useState } from "react";
// components
import { Link } from "react-router-dom";
import { AudioLines, Bell, LogIn, UserRound } from "lucide-react";
import DropdownMenu from "./DropdownMenu";
// context
import { useAuthContext } from "../hooks/useAuthContext";
// framer-motion
import { AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { user } = useAuthContext();

    const handleBlur = () => {
        setTimeout(() => {
            setShowDropdown(false);
        }, 200);
    }

    return (
        <nav className="flex items-center justify-between my-4">
            <Link to="/" className="flex gap-2 items-center">
                <AudioLines className="text-red-400 h-8 w-8" />
                <h1 className="text-red-400 font-bold text-3xl text-center tracking-wide">Discussion</h1>
            </Link>

            {!user &&
                <Link to="/login" className="nav-link">
                    Sign in
                    <LogIn className="h-4 w-4" />
                </Link>
            }
            {user && (
                <div className="flex items-center gap-3 ml-auto">
                    <Link to="/notifications">
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 relative hover:bg-neutral-200">
                            {/* {unreadNotifications} */}
                            <Bell className="text-red-400" />
                        </button>
                    </Link>
                    <div className="relative" onClick={() => setShowDropdown(open => !open)} onBlur={handleBlur}>
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 relative hover:bg-neutral-200">
                            {!user.photoUrl ? <UserRound className="text-red-500" /> : <img src={user.photoUrl} className="w-full h-full object-cover rounded-full" />}
                        </button>
                        {showDropdown && (
                            <AnimatePresence>
                                <DropdownMenu />
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar;