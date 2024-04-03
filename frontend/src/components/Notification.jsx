
// components
import { Link } from "react-router-dom";
import UserAvatar from "../components/UserAvatar";
// date formatter
import { formatDistance } from "date-fns";
// assets
import { CornerDownRight, Trash } from "lucide-react";

const Notification = ({ notification, isLoading, handleDelete }) => {
    return (
        <>
            <header className="flex items-center gap-2 mb-2">
                <UserAvatar name={notification.creator.name} photoUrl={notification.creator.photoUrl} />
                <p>{notification.type}</p>
                <p className="ml-auto">{formatDistance(new Date(notification.createdAt), new Date(), { addSuffix: true })}</p>
                <button onClick={() => handleDelete(notification._id)} disabled={isLoading}>
                    <Trash className="icon" />
                </button>
            </header>
            <Link to={`/posts/${notification.post}`}>
                <main className="flex items-center gap-2 pl-[6px]">
                    <CornerDownRight className="icon" />
                    <p>{notification.commentContent.substring(0, 50)}...</p>
                </main>
            </Link>
        </>
    )
}

export default Notification;