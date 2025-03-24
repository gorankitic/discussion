// lib
import { useEffect } from "react";
import { PenLine, Reply } from "lucide-react";
import { format } from "date-fns";
// types
import { TComment } from "@/lib/types/types";
import { CommentSchema } from "@/lib/types/schemas";
// components
import Form from "@/features/comments/Form";
import UserAvatar from "@/components/UserAvatar";
import NestedComments from "@/features/comments/NestedComments";
import CommentActions from "@/features/comments/CommentActions";
// hooks
import { useCreateComment } from "@/features/comments/useCreateComment";
import { useUpdateComment } from "@/features/comments/useUpdateComment";
import { useActiveComment } from "@/context/ActiveCommentContext";
import Upvote from "../upvotes/Upvote";

interface CommentProps {
    comment: TComment,
    postId: string,
}

const Comment = ({ comment, postId }: CommentProps) => {
    const { activeComment, setActiveComment } = useActiveComment();
    const { isCreating, createComment } = useCreateComment();
    const { isUpdatingComment, updateComment } = useUpdateComment();

    const isReplying = activeComment.id === comment._id && activeComment.type === "reply";
    const isUpdating = activeComment.id === comment._id && activeComment.type === "update";

    const onSubmitReply = (data: CommentSchema) => {
        createComment({ postId, parentId: comment._id, data }, {
            onSuccess: () => {
                setActiveComment({ id: null, type: null });
            }
        });
    }

    const onSubmitUpdate = (data: CommentSchema) => {
        updateComment({ data, postId, commentId: comment._id }, {
            onSuccess: () => {
                setActiveComment({ id: null, type: null });
            }
        });
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActiveComment({ id: null, type: null });
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    return (
        <>
            <article key={comment._id} className="flex gap-4 border border-gray-300 rounded-md py-3 px-4 mb-3">
                <Upvote upvoteCount={comment.upvoteCount} />
                <div className="flex-1">
                    <header className="flex justify-between">
                        <UserAvatar name={comment.user.name} photoUrl={comment.user.photoUrl} />
                        <p className="text-sm">{format(new Date(comment.updatedAt), "d.M.y. H:mm")}</p>
                    </header>
                    <p className="mt-1">{comment.content}</p>
                    <section className="mt-1">
                        {isReplying && (
                            <Form
                                onSubmit={onSubmitReply}
                                isLoading={isCreating}
                                label="Reply"
                                placeholder="Write a reply..."
                                icon={Reply}
                                iconPosition="left"
                            />
                        )}
                        {isUpdating && (
                            <Form
                                onSubmit={onSubmitUpdate}
                                isLoading={isUpdatingComment}
                                defaultValue={comment.content}
                                label="Update"
                                icon={PenLine}
                                iconPosition="left"
                            />
                        )}
                        {!(isReplying || isUpdating) && (
                            <CommentActions
                                comment={comment}
                                postId={postId}
                            />
                        )}
                    </section>
                    {(isReplying || isUpdating) && <span className="text-xs flex justify-end mt-1 mr-3">Press ESC to cancel</span>}
                </div>
            </article>
            {comment.nestedComments && comment.nestedComments?.length > 0 && (
                <NestedComments nestedComments={comment.nestedComments} postId={postId} />
            )}
        </>
    )
};

export default Comment;