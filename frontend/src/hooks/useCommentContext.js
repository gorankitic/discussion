// hooks
import { useContext } from "react";
// context
import { CommentContext } from "../context/CommentContext";

export const useCommentContext = () => {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error("useCommentContext must be used inside an CommentContextProvider");
    }
    return context;
}
