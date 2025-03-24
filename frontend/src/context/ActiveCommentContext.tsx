import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type ActiveCommentType = { id: string | null, type: "reply" | "update" | null };

type ActiveCommentContextType = {
    activeComment: ActiveCommentType,
    setActiveComment: Dispatch<SetStateAction<ActiveCommentType>>,
}

const ActiveCommentContext = createContext<ActiveCommentContextType | undefined>(undefined);

export const ActiveCommentProvider = ({ children }: { children: ReactNode }) => {
    const [activeComment, setActiveComment] = useState<ActiveCommentType>({ id: null, type: null });

    return (
        <ActiveCommentContext.Provider value={{ activeComment, setActiveComment }}>
            {children}
        </ActiveCommentContext.Provider>
    )
}

export const useActiveComment = () => {
    const context = useContext(ActiveCommentContext);
    if (!context) {
        throw new Error("useActiveComment must be used within an ActiveCommentProvider");
    }
    return context;
}