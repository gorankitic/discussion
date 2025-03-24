// types
import { TComment } from "@/lib/types/types";
// components
import Comment from "@/features/comments/Comment";

interface CommentsListProps {
    postId: string,
    comments: TComment[],
}

const CommentsList = ({ postId, comments }: CommentsListProps) => {

    return (
        <section className="flex-1">
            {comments.map((comment: TComment) => (
                <li key={comment._id}>
                    <Comment
                        comment={comment}
                        postId={postId!}
                    />
                </li>
            ))}
        </section >
    );
};

export default CommentsList;