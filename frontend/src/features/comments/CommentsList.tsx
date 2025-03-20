// lib
import { useState } from "react";
// types
import { TComment } from "@/lib/types/types";
// components
import Comment from "@/features/comments/Comment";

interface CommentsListProps {
    comments: TComment[],
    postId: string
}

const CommentsList = ({ comments, postId }: CommentsListProps) => {
    const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
    const [activeFormType, setActiveFormType] = useState<"reply" | "update" | null>(null);

    return (
        <section className="flex-1">
            {comments.map((comment: TComment) => (
                <Comment
                    key={comment._id}
                    comment={comment}
                    postId={postId}
                    activeCommentId={activeCommentId}
                    setActiveCommentId={setActiveCommentId}
                    activeFormType={activeFormType}
                    setActiveFormType={setActiveFormType}
                />
            ))}
        </section>
    );
};

export default CommentsList;