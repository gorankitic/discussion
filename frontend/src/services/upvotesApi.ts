// constants
import { baseApiUrl } from "@/lib/constants";

export const upvoteCommentApi = async ({ commentId }: { commentId: string }) => {
    const response = await fetch(`${baseApiUrl}/api/v1/comments/${commentId}/upvotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const removeUpvoteCommentApi = async ({ commentId }: { commentId: string }) => {
    const response = await fetch(`${baseApiUrl}/api/v1/comments/${commentId}/upvotes`, {
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