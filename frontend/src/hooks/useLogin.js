// context
import { useAuthContext } from "../context/AuthContext"

export const useLogin = () => {
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        dispatch({ type: "loading" });
        try {
            // Fetch API won't throw an error on 400 and 500 response 
            // Check response.ok to handle this server errors when the promise gets resolved
            // Fetch will throw an error when promise gets rejected (example: network or CORS errors)
            // So handle all errors in one place in catch
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message);
            }
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'login', payload: json });
            }
        } catch (error) {
            dispatch({ type: "rejected", payload: error.message });
        }
    }

    return { login }
}