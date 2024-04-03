
// hooks
import { useEffect, useState, useRef, useCallback } from "react";
// services
import { getNotifications, updateUnreadNotifications, deleteNotification } from "../services/notificationsApi";
// components
import BigLoader from "../components/BigLoader";
import Notification from "../components/Notification";


const Notifications = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                const json = await getNotifications(page);
                setNotifications(prev => [...prev, ...json.notifications]);
                setHasMorePages(json.hasMorePages);
                await updateUnreadNotifications();
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false);
            }
        })();
    }, [page]);

    const observer = useRef();
    const lastNotificationRef = useCallback((node) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMorePages) {
                setPage(prev => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMorePages]);


    const handleDelete = async (notificationId) => {
        try {
            await deleteNotification(notificationId);
            setNotifications(prevNotif => prevNotif.filter(n => n._id !== notificationId));
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div className="flex flex-col gap-2 w-full mx-auto mb-10">
            <h1 className="text-red-400 text-2xl justify-start my-4">Notifications:</h1>
            {error && <p className="text-red-500">{error}</p>}
            {notifications
                ?
                notifications.map((notification, index) => {
                    if (notifications.length === index + 1) {
                        return (
                            <div key={notification._id} ref={lastNotificationRef} className="flex flex-col mb-2 w-full">
                                <Notification notification={notification} isLoading={isLoading} handleDelete={handleDelete} />
                            </div>
                        )
                    } else {
                        return (
                            <div key={notification._id} className="flex flex-col mb-2 w-full">
                                <Notification notification={notification} isLoading={isLoading} handleDelete={handleDelete} />
                            </div>

                        )
                    }
                })
                :
                <p className="text-2xl">There are no notifications.</p>
            }
            {isLoading && (
                <div className="text-center my-6">
                    <BigLoader />
                </div>
            )}
        </div>
    )
}

export default Notifications;