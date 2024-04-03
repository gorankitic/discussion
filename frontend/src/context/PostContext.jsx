// hooks
import { createContext, useReducer, useEffect } from "react";
// services
import { getPosts } from "../services/postApi";

export const PostContext = createContext();

const initialState = {
    posts: [],
    post: null,
    page: 1,
    hasMorePages: false,
    isLoading: false,
    disabled: false,
    error: null
}

const postReducer = (state, action) => {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true }
        case "buttons/disabled":
            return { ...state, disabled: true }
        case "buttons/enabled":
            return { ...state, disabled: false }
        case "page/increment":
            return { ...state, page: state.page + 1 }
        case "posts/loaded":
            return { ...state, posts: [...state.posts, ...action.payload.posts], hasMorePages: action.payload.hasMorePages, isLoading: false, error: null }
        case "post/loaded":
            return { ...state, post: action.payload, isLoading: false, error: null }
        case "post/created":
            return { ...state, posts: [action.payload, ...state.posts], isLoading: false, error: null, disabled: false }
        case "post/updated":
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? { ...action.payload } : post), post: action.payload, isLoading: false, error: null, disabled: false }
        case "post/deleted":
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload), isLoading: false, error: null, disabled: false }
        case "rejected":
            return { ...state, isLoading: false, error: action.payload }
        default:
            return state;
    }
}

export const PostContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, initialState);
    const { page } = state;

    useEffect(() => {
        (async () => {
            dispatch({ type: "loading" });
            try {
                const json = await getPosts(page);
                dispatch({ type: "posts/loaded", payload: json });
            } catch (error) {
                dispatch({ type: "rejected", payload: error.message });
            }
        })();
    }, [dispatch, page]);


    console.log("PostContext state: ", state);
    return (
        <PostContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PostContext.Provider>
    )
}