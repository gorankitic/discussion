const LIMIT = 15;

export const getNotifications = async (page = 1) => {
    const response = await fetch(`http://localhost:5000/api/users/notifications?page=${page}&limit=${LIMIT}`, {
        credentials: 'include'
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const updateUnreadNotifications = async () => {
    const response = await fetch(`http://localhost:5000/api/users/notifications`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    if (!response.ok) {
        const json = await response.json();
        throw new Error(json.message);
    }
    return response;
}

export const deleteNotification = async (notificationId) => {
    const response = await fetch(`http://localhost:5000/api/users/notifications/${notificationId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    if (!response.ok) {
        const json = await response.json();
        throw new Error(json.message);
    }
    return response;
}