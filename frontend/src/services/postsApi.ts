// types
import { PostSchema } from "@/lib/types/schemas";
// constants
import { baseApiUrl, POSTS_LIMIT } from "@/lib/constants";



export const getPostsApi = async (page: number) => {
    // The Fetch API does not throw an error for HTTP error statuses (e.g., 400 or 500). 
    // Check response.ok to handle this server errors when the promise gets resolved
    // The Fetch API rejects the promise if there's a network error, the request is aborted, or CORS errors
    const response = await fetch(`${baseApiUrl}/api/v1/posts?page=${page}&limit=${POSTS_LIMIT}`, {
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

export const createPostApi = async (data: PostSchema) => {
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

export const updatePostApi = async ({ data, postId }: { data: PostSchema, postId: string }) => {
    const response = await fetch(`${baseApiUrl}/api/v1/posts/${postId}`, {
        method: "PATCH",
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