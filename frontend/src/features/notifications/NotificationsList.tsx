// types
import { TNotification } from "@/lib/types/types";
// components
import Notification from "@/features/notifications/Notification";

interface NotificationsListProps {
    notifications: TNotification[]
}

const NotificationsList = ({ notifications }: NotificationsListProps) => {
    return (
        <section>
            {notifications.map((notification: TNotification) => (
                <li key={notification._id}>
                    <Notification notification={notification} />
                </li>
            ))}
        </section >
    )
}

export default NotificationsList;