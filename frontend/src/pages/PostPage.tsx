// lib
import { useParams } from "react-router"
// types
import { CommentSchema } from "@/lib/types/schemas";
// hooks
import { usePost } from "@/features/posts/usePost";
import { useComments } from "@/features/comments/useComments";
import { useCreateComment } from "@/features/comments/useCreateComment";
// components
import Loader from "@/components/Loader";
import Post from "@/features/posts/Post";
import Form from "@/features/comments/Form";
import CommentsList from "@/features/comments/CommentsList";

const PostPage = () => {
    const { postId } = useParams();
    const { data, isLoadingPost } = usePost(postId!);
    const { dataComments, isLoadingComments } = useComments(postId!);
    const { isCreating, createComment } = useCreateComment();

    const onSubmitComment = (data: CommentSchema) => {
        if (!postId) return;
        createComment({ postId, parentId: null, data });
    }

    if (isLoadingPost || isLoadingComments) {
        return (
            <div className="flex-1">
                <Loader className="size-12 mt-40" />
            </div>
        )
    }

    return (
        <main className="flex-1 space-y-3">
            {data?.post && (
                <>
                    <Post post={data.post} />
                    <Form
                        onSubmit={onSubmitComment}
                        isLoading={isCreating}
                        label="Comment"
                        placeholder="Write a comment..."
                    />
                    {dataComments && <CommentsList comments={dataComments.comments} postId={postId!} />}
                </>
            )}
        </main >
    )
}

export default PostPage;