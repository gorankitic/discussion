// hooks
import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { useCommentContext } from "./CommentContext";

const PostContext = createContext();

const initialState = {
    posts: [],
    post: null,
    comments: [],
    isLoading: false,
    error: null
}

const postReducer = (state, action) => {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true }
        case "posts/loaded":
            return { ...state, posts: action.payload, isLoading: false, error: null }
        case "post/loaded":
            return { ...state, post: action.payload, isLoading: false, error: null }
        case "rejected":
            return { posts: null, isLoading: false, error: action.payload }
        default:
            return state;
    }
}

export const PostContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, initialState);
    const { dispatch: dispatchComments } = useCommentContext();

    useEffect(() => {
        (async () => {
            dispatch({ type: "loading" });
            try {
                const response = await fetch('http://localhost:5000/api/posts', {
                    credentials: 'include'
                });
                const json = await response.json();

                if (!response.ok) {
                    throw new Error(json.message);
                }
                if (response.ok) {
                    dispatch({ type: "posts/loaded", payload: json.posts });
                }
            } catch (error) {
                dispatch({ type: "rejected", payload: error.message });
            }
        })();
    }, []);

    const getPost = useCallback(async (postId) => {
        dispatch({ type: "loading" });
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                credentials: 'include'
            });
            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message);
            }
            if (response.ok) {
                dispatch({ type: "post/loaded", payload: json.post });
                dispatchComments({ type: "comments/loaded", payload: json.post.comments });
            }
        } catch (error) {
            dispatch({ type: "rejected", payload: error.message });
        }
    }, [dispatchComments]);

    // console.log("PostContext state: ", state);
    return (
        <PostContext.Provider value={{ ...state, dispatch, getPost }}>
            {children}
        </PostContext.Provider>
    )
}

export const usePostContext = () => {
    const context = useContext(PostContext);

    if (!context) {
        throw new Error('usePostContext must be used inside an PostContextProvider');
    }

    return context;
}