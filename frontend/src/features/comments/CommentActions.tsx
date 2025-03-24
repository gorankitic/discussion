// lib
import { PenBoxIcon, Reply } from "lucide-react";
// types
import { TComment } from "@/lib/types/types";
// components
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
// hooks
import { useUser } from "@/features/authentication/useUser";
import { useDeleteComment } from "@/features/comments/useDeleteComment";
import { useActiveComment } from "@/context/ActiveCommentContext";

interface CommentActionsProps {
    comment: TComment,
    postId: string,
}

const CommentActions = ({ comment, postId }: CommentActionsProps) => {
    const { user } = useUser();
    const { setActiveComment } = useActiveComment();
    const { isDeleting, deleteComment } = useDeleteComment();
    return (
        <div className="flex items-center justify-end gap-2">
            <button
                className="cursor-pointer"
                aria-label="Reply"
                onClick={() => setActiveComment({ id: comment._id, type: "reply" })}
            >
                <Reply className="size-4" />
            </button>
            {user._id === comment.user._id && (
                <>
                    <button
                        className="cursor-pointer"
                        aria-label="Update"
                        onClick={() => setActiveComment({ id: comment._id, type: "update" })}
                    >
                        <PenBoxIcon className="size-4" />
                    </button>
                    <ConfirmDeleteModal
                        title="Are you sure you want to delete this comment?"
                        description="All its replies will also be deleted. This action cannot be undone."
                        isProcessing={isDeleting}
                        onDelete={() => deleteComment({ postId, commentId: comment._id })}
                    />
                </>
            )}
        </div>
    )
}

export default CommentActions;