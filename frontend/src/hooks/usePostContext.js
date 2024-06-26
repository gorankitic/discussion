// hooks
import { useContext } from "react";
// context
import { PostContext } from "../context/PostContext";


export const usePostContext = () => {
    const context = useContext(PostContext);

    if (!context) {
        throw new Error('usePostContext must be used inside an PostContextProvider');
    }

    return context;
}