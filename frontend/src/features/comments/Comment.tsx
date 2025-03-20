// lib
import { Dispatch, SetStateAction, useEffect } from "react";
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

interface CommentProps {
    comment: TComment,
    postId: string,
    activeCommentId: string | null,
    setActiveCommentId: Dispatch<SetStateAction<string | null>>,
    activeFormType: "reply" | "update" | null,
    setActiveFormType: Dispatch<SetStateAction<"reply" | "update" | null>>
}

const Comment = ({ comment, postId, activeCommentId, setActiveCommentId, activeFormType, setActiveFormType }: CommentProps) => {
    const { isCreating, createComment } = useCreateComment();
    const { isUpdatingComment, updateComment } = useUpdateComment(() => setActiveCommentId(null));

    const isReplying = activeCommentId === comment._id && activeFormType === "reply";
    const isUpdating = activeCommentId === comment._id && activeFormType === "update";

    const onSubmitReply = (data: CommentSchema) => {
        createComment({ postId, parentId: comment._id, data },
            {
                onSuccess: () => {
                    setActiveCommentId(null);
                    setActiveFormType(null);
                }
            }
        );
    }

    const onSubmitUpdate = (data: CommentSchema) => {
        updateComment({ data, postId, commentId: comment._id },
            {
                onSuccess: () => {
                    setActiveCommentId(null);
                    setActiveFormType(null);
                }
            }
        );
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActiveCommentId(null);
                setActiveFormType(null);
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            setActiveCommentId(null);
            setActiveFormType(null);
        }
    }, []);

    return (
        <>
            <article key={comment._id} className="border border-gray-300 rounded-md p-3 mb-3">
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
                            setActiveCommentId={setActiveCommentId}
                            setActiveFormType={setActiveFormType}
                        />
                    )}
                </section>
                {(isReplying || isUpdating) && <span className="text-xs flex justify-end mt-1 mr-3">Press ESC to cancel</span>}
            </article>
            {comment.nestedComments && comment.nestedComments?.length > 0 && (
                <NestedComments nestedComments={comment.nestedComments} postId={postId} />
            )}
        </>
    )
}

export default Comment;