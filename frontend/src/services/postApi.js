const LIMIT = 10;

export const createPost = async ({ title, content }) => {
    const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, content })
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const getPosts = async (page = 1) => {
    const response = await fetch(`http://localhost:5000/api/posts?page=${page}&limit=${LIMIT}`, {
        credentials: 'include'
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const getPost = async (postId) => {
    const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        credentials: 'include'
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const updatePost = async ({ content, postId }) => {
    const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
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

export const deletePost = async (postId) => {
    const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
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