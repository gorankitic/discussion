// hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// components
import Form from "./Form";
import CommentList from "./CommentList";
import IconButton from "./IconButton";
import UserAvatar from "./UserAvatar";
// context
import { useCommentContext } from "../hooks/useCommentContext";
import { useAuthContext } from "../hooks/useAuthContext";
// services
import { createComment, deleteComment, updateComment } from "../services/commentApi";
// assets
import { Reply, Send, SquarePen, Trash } from "lucide-react";
// date formatter
import { format } from "date-fns";

const Comment = ({ comment }) => {
    const [error, setError] = useState("");
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [hideNested, setHideNested] = useState(false);
    const { postId } = useParams();
    const { user } = useAuthContext();
    const { dispatch, getReplies } = useCommentContext();
    const nestedComments = getReplies(comment._id);

    const handleReply = async (content) => {
        try {
            const repliedComment = await createComment({ content, postId, parentId: comment._id });
            dispatch({ type: 'comment/created', payload: repliedComment });
            setIsReplying(false);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleUpdate = async (content) => {
        try {
            const updatedComment = await updateComment({ content, postId, commentId: comment._id });
            dispatch({ type: 'comment/updated', payload: updatedComment });
            setIsEditing(false);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await deleteComment(postId, comment._id);
            if (response.ok) {
                dispatch({ type: 'comment/deleted', payload: comment._id });
            }
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" || event.keyCode === 27) {
                setIsEditing(false);
                setIsReplying(false);
                setError("");
                dispatch({ type: "buttons/enabled" });
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            setIsEditing(false);
            setIsReplying(false);
        };
    }, [dispatch]);

    return (
        <>
            <div className="border border-neutral-300 rounded-md p-3 mb-4">
                <header className="flex justify-between">
                    <UserAvatar photoUrl={comment.user.photoUrl} name={comment.user.name} />
                    <p>{format(new Date(comment.updatedAt), "d.M.y. H:mm")}</p>
                </header>
                <main>
                    {isEditing
                        ?
                        <Form
                            label="Update"
                            autoFocus={true}
                            initialValue={comment.content}
                            handleSubmit={handleUpdate}
                            commentId={comment._id}
                            Icon={Send}
                        />
                        :
                        <p className="mt-1">{comment.content}</p>
                    }
                </main>
                <section className="flex gap-2 justify-end mt-2">
                    {isEditing && <span className="text-xs">Press ESC to cancel</span>}
                    {!(isEditing || isReplying) && user && (
                        <IconButton
                            Icon={Reply}
                            onClick={() => {
                                setIsReplying(true);
                                dispatch({ type: "buttons/disabled" })
                            }}
                        />
                    )}
                    {!(isEditing || isReplying) && user && user._id === comment.user._id && (
                        <>
                            <IconButton
                                Icon={SquarePen}
                                onClick={() => {
                                    setIsEditing(true);
                                    dispatch({ type: "buttons/disabled" })
                                }}
                            />
                            <IconButton Icon={Trash} onClick={() => { handleDelete(); dispatch({ type: "buttons/disabled" }) }} />
                        </>
                    )}
                </section>
                {isReplying && (
                    <Form
                        label="Reply"
                        placeholder="Write a reply..."
                        autoFocus={true}
                        handleSubmit={handleReply}
                        parentId={comment._id}
                        Icon={Reply}
                    />
                )}
                {isReplying && <span className="text-xs flex justify-end mt-1">Press ESC to cancel</span>}
                {error && <p className="text-red-500">{error}</p>}
            </div>

            {nestedComments?.length > 0 && (
                <div>
                    <div className={`flex gap-5 ${hideNested ? "hide" : ""}`}>
                        <button className="collapse-line" onClick={() => setHideNested(true)} />
                        <CommentList comments={nestedComments} />
                    </div>
                    <button
                        className={`text-red-500 mb-4 text-sm cursor-pointer underline ${!hideNested ? "hide" : ""}`}
                        onClick={() => setHideNested(false)}
                    >
                        Show replies
                    </button>
                </div>
            )}

        </>
    )
}

export default Comment;