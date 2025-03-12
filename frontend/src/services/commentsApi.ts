
const LIMIT = 5
const baseApiUrl = import.meta.env.VITE_API_URL;


export const getCommentsApi = async (postId: string, page = 1) => {
    const response = await fetch(`${baseApiUrl}/api/v1/posts/${postId}/comments?page=${3}&limit=${LIMIT}`, {
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}