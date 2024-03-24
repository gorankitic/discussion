// react
import { Link } from "react-router-dom";
// hooks
import { useLogout } from "../hooks/useLogout";
// components
import Loader from "../components/Loader";
// context
import { useAuthContext } from "../context/AuthContext";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
    const { user, isLoading, error } = useAuthContext();
    const { logout } = useLogout();

    return (
        <header className="flex items-center justify-between my-10">
            <h1 className="text-red-500 font-bold text-3xl text-center">Nested comments system</h1>
            {!user && <Link to="/login" className="link">Sign in</Link>}
            {user && (
                <div className="flex items-center gap-3 ml-auto">
                    <UserAvatar name={user.name} photoUrl={user.photoUrl} />
                    <button disabled={isLoading} className="btn" onClick={logout}>
                        {isLoading ? <Loader /> : "Sign out"}
                    </button>
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </header>
    )
}

export default Navbar;