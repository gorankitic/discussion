// types
import { CommentSchema } from "@/lib/types/schemas";
// constants
import { baseApiUrl, COMMENTS_LIMIT } from "@/lib/constants";

export const createCommentApi = async ({ postId, parentId, data }: { postId: string, parentId: string | null, data: CommentSchema }) => {
    const response = await fetch(`${baseApiUrl}/api/v1/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: data.content, parentId })
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const getCommentsApi = async (postId: string, page = 1) => {
    const response = await fetch(`${baseApiUrl}/api/v1/posts/${postId}/comments?page=${page}&limit=${COMMENTS_LIMIT}`, {
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const updateCommentApi = async ({ data, postId, commentId }: { data: CommentSchema, postId: string, commentId: string }) => {
    const response = await fetch(`${baseApiUrl}/api/v1/posts/${postId}/comments/${commentId}`, {
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

export const deleteCommentApi = async ({ postId, commentId }: { postId: string, commentId: string }) => {
    const response = await fetch(`${baseApiUrl}/api/v1/posts/${postId}/comments/${commentId}`, {
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