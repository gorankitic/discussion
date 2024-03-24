
export const createComment = async ({ content, postId, parentId }) => {
    const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content, parentId })
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const updateComment = async ({ content, postId, commentId }) => {
    const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments/${commentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content })
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const deleteComment = async (postId, commentId) => {
    const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
    });

    if (!response.ok) {
        const json = await response.json();
        throw new Error(json.message);
    }
    return response;
}