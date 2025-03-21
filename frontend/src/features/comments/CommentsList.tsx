// lib
import { useState } from "react";
// types
import { TComment } from "@/lib/types/types";
// components
import Comment from "@/features/comments/Comment";

interface CommentsListProps {
    postId: string,
    comments: TComment[],
}

const CommentsList = ({ postId, comments }: CommentsListProps) => {
    const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
    const [activeFormType, setActiveFormType] = useState<"reply" | "update" | null>(null);

    return (
        <section className="flex-1">
            {comments.map((comment: TComment) => (
                <li key={comment._id}>
                    <Comment
                        comment={comment}
                        postId={postId!}
                        activeCommentId={activeCommentId}
                        setActiveCommentId={setActiveCommentId}
                        activeFormType={activeFormType}
                        setActiveFormType={setActiveFormType}
                    />
                </li>
            ))}
        </section >
    );
};

export default CommentsList;