// lib
import { useEffect } from "react";
// hooks
import { useNotifications } from "@/features/notifications/useNotifications";
import { useUpdateNotifications } from "@/features/notifications/useUpdateNotifications";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
// components
import Loader from "@/components/Loader";
import NotificationsList from "@/features/notifications/NotificationsList";

const Notifications = () => {
    const { data, isPending, fetchNextPage, isFetchingNextPage } = useNotifications();
    const { updateNotifications } = useUpdateNotifications();
    const { ref } = useInfiniteScroll(fetchNextPage);

    useEffect(() => {
        updateNotifications();
    }, [updateNotifications])

    if (isPending) {
        return (
            <div className="flex-1">
                <Loader className="size-12 mt-40" />
            </div>
        )
    }

    return (
        <main className="flex-1">
            <h1 className="font-medium text-xl my-4">Your notifications:</h1>
            {data && data.pages[0].totalNotifications === 0 && <p className="text-sm text-center">You have no notifications.</p >}
            {data && data.pages.map(currentPage => (
                <ul key={currentPage.page}>
                    <NotificationsList notifications={currentPage.notifications} />
                </ul>
            ))}
            <div ref={ref}>
                {isFetchingNextPage && <Loader className="size-10 mt-10" />}
            </div>
        </main>
    )
}

export default Notifications;