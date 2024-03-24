// context
import { useAuthContext } from "../context/AuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        try {
            dispatch({ type: "loading" });
            // Fetch API won't throw an error on 400 and 500 response 
            // Check response.ok to handle this server errors when the promise gets resolved
            // Fetch will throw an error when promise gets rejected (example: network or CORS errors)
            // So handle all errors in one place in catch
            const response = await fetch('http://localhost:5000/api/users/logout', { credentials: 'include' });
            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message);
            }
            if (response.ok) {
                localStorage.removeItem('user');
                dispatch({ type: 'logout' });
            }
        } catch (error) {
            dispatch({ type: "rejected", payload: error.message });
        }
    }

    return { logout }
}