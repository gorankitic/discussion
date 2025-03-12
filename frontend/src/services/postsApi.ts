// types
import { CreatePostSchema } from "@/lib/types/schemas";

const baseApiUrl = import.meta.env.VITE_API_URL;

export const getPostsApi = async () => {
    // The Fetch API does not throw an error for HTTP error statuses (e.g., 400 or 500). 
    // Check response.ok to handle this server errors when the promise gets resolved
    // The Fetch API rejects the promise if there's a network error, the request is aborted, or CORS errors
    const response = await fetch(`${baseApiUrl}/api/v1/posts`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const getPostApi = async (postId: string) => {
    const response = await fetch(`${baseApiUrl}/api/v1/posts/${postId}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const createPostApi = async (data: CreatePostSchema) => {
    const response = await fetch(`${baseApiUrl}/api/v1/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const deletePostApi = async (postId: string) => {
    const response = await fetch(`${baseApiUrl}/api/v1/posts/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });
    if (response.status === 204) {
        return { status: "success" };
    }
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}