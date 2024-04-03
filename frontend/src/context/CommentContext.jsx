// hooks
import { createContext, useMemo, useReducer } from "react";

export const CommentContext = createContext();

const initialState = {
    comments: [],
    disabled: false,
    error: null,
}

const commentReducer = (state, action) => {
    switch (action.type) {
        case "buttons/disabled":
            return { ...state, disabled: true }
        case "buttons/enabled":
            return { ...state, disabled: false }
        case "comments/loaded":
            return { ...state, comments: action.payload, error: null }
        case "comment/created":
            return { ...state, comments: [action.payload, ...state.comments], error: null, disabled: false }
        case "comment/updated":
            return { ...state, comments: state.comments.map(comment => comment._id === action.payload._id ? { ...action.payload } : comment), error: null, disabled: false }
        case "comment/deleted":
            return { ...state, comments: state.comments.filter(comment => comment._id !== action.payload), error: null, disabled: false }
        case "rejected":
            return { ...state, error: action.payload, disabled: false }
        default:
            return state;
    }
}

export const CommentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(commentReducer, initialState);
    const { comments } = state;

    const commentsByParentId = useMemo(() => {
        // Grouping comments by rootComments(comments where parent === null) and nestedComments of rootComments
        // rootComments -> comment.parent === null -> { null: [{...}, {...}, ...] }
        // nestedComments of rootComment -> comment.parent === parentId -> { parentId: [{...}, {...}, ...] }
        const group = {};
        comments.forEach(comment => {
            // if there is parentId in group then use that array else use new empty array
            group[comment.parent] ||= [];
            group[comment.parent].push(comment);
        });
        return group;
    }, [comments]);

    // getReplies -> get comments that have parent with parentId
    const getReplies = (parentId) => {
        return commentsByParentId[parentId];
    }

    console.log("CommentContext state: ", state);
    return (
        <CommentContext.Provider value={{ ...state, dispatch, rootComments: commentsByParentId[null], getReplies }}>
            {children}
        </CommentContext.Provider>
    )
}