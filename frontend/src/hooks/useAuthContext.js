
// hooks
import { useContext } from "react";
// context
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used inside an AuthContextProvider');
    }

    return context;
}