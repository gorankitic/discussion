// lib
import { Link } from "react-router";
import { formatDistance } from "date-fns";
import { CornerDownRight } from "lucide-react";
// types
import { TNotification } from "@/lib/types/types";
// components
import UserAvatar from "@/components/UserAvatar";
import TextExpander from "@/components/TextExpander";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
// hooks
import { useDeleteNotification } from "@/features/notifications/useDeleteNotification";

interface NotificationProps {
    notification: TNotification;
}

const Notification = ({ notification }: NotificationProps) => {
    const { isDeleting, deleteNotification } = useDeleteNotification();

    return (
        <article className="mb-5">
            <header className="flex items-center gap-1 mb-2">
                <UserAvatar name={notification.sender.name} photoUrl={notification.sender.photoUrl} />
                {notification.type === "comment" && <p> commented on your post.</p>}
                {notification.type === "reply" && <p> replied to your comment.</p>}
                <div className="flex gap-5 ml-auto items-center">
                    <p className="text-sm">{formatDistance(new Date(notification.createdAt), new Date(), { addSuffix: true })}</p>
                    <ConfirmDeleteModal
                        title="Are you sure you want to delete this notification?"
                        description="This action cannot be undone."
                        isProcessing={isDeleting}
                        onDelete={() => deleteNotification({ notificationId: notification._id })}
                    />
                </div>
            </header>
            <Link to={`/posts/${notification.post}`}>
                <main className="flex gap-2 pl-2">
                    <CornerDownRight className="size-5" />
                    <TextExpander>{notification.comment.content}</TextExpander>
                </main>
            </Link>
        </article>
    )
}

export default Notification;