// constants
import { baseApiUrl, NOTIFICATIONS_LIMIT } from "@/lib/constants";

export const getNotificationsApi = async (page: number) => {
    const response = await fetch(`${baseApiUrl}/api/v1/users/notifications?page=${page}&limit=${NOTIFICATIONS_LIMIT}`, {
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const updateNotificationsApi = async () => {
    const response = await fetch(`${baseApiUrl}/api/v1/users/notifications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}


export const deleteNotificationApi = async ({ notificationId }: { notificationId: string }) => {
    const response = await fetch(`${baseApiUrl}/api/v1/users/notifications/${notificationId}`, {
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