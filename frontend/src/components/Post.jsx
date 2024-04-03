
// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// components
import Form from "./Form";
import UserAvatar from "./UserAvatar";
import IconButton from "./IconButton";
// context
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import { useCommentContext } from "../hooks/useCommentContext";
// services
import { deletePost, updatePost } from "../services/postApi";
// assets
import { SquarePen, Trash, Send } from "lucide-react";
// date formatter
import { formatDistance } from "date-fns";

const Post = ({ post, isPage }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { dispatch: dispatchPost } = usePostContext();
    const { dispatch: dispatchComment } = useCommentContext();

    const handleUpdate = async (content) => {
        try {
            const updatedPost = await updatePost({ content, postId: post._id });
            dispatchPost({ type: 'post/updated', payload: updatedPost });
            setIsEditing(false);
            dispatchComment({ type: "buttons/enabled" });
        } catch (error) {
            setError(error.message);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await deletePost(post._id);
            if (response.ok) {
                dispatchPost({ type: 'post/deleted', payload: post._id });
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" || event.keyCode === 27) {
                setIsEditing(false);
                setError(null);
                dispatchPost({ type: "buttons/enabled" });
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            setIsEditing(false);
            setError(null);
            dispatchPost({ type: "buttons/enabled" });
        };
    }, [dispatchPost]);

    return (
        <section className="border border-neutral-300 rounded-md p-3 mb-4">
            <header className="flex items-center border-b border-neutral-300 pb-2">
                <UserAvatar name={post.user.name} photoUrl={post.user.photoUrl} />
                <div className="ml-auto flex items-center gap-2">
                    <p>{formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}</p>
                    {isPage && !isEditing && user && user._id === post.user._id && (
                        <>
                            <IconButton
                                Icon={SquarePen}
                                onClick={() => {
                                    setIsEditing(true);
                                    dispatchPost({ type: "buttons/disabled" })
                                    dispatchComment({ type: "buttons/disabled" })
                                }}
                            />
                            <IconButton Icon={Trash} onClick={handleDelete} />
                        </>
                    )}
                </div>
            </header>
            <main className="my-2">
                <h1 className="text-xl font-medium mb-2">{post.title}</h1>
                {isEditing
                    ?
                    <>
                        <Form
                            label="Update"
                            autoFocus={true}
                            initialValue={post.content}
                            handleSubmit={handleUpdate}
                            Icon={Send}
                        />
                        <span className="text-xs mt-2 flex justify-end">Press ESC to cancel</span>
                        {error && <p className="text-red-500 mt-1">{error}</p>}
                    </>
                    :
                    <p className="mt-1">{post.content}</p>
                }
            </main>
        </section>
    )
}

export default Post;