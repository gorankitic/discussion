// react hooks
import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isLoading: false,
    error: null
}

const authReducer = (state, action) => {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true }
        case "login":
            return { user: action.payload, isLoading: false, error: null }
        case "logout":
            return { user: null, isLoading: false, error: null }
        case "rejected":
            return { ...state, isLoading: false, error: action.payload }
        default: {
            return state;
        }
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // console.log("AuthContext state: ", state);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: "login", payload: user });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used inside an AuthContextProvider');
    }

    return context;
}