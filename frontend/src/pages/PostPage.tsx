// lib
import { useParams } from "react-router"
// types
import { CommentSchema } from "@/lib/types/schemas";
// hooks
import { usePost } from "@/features/posts/usePost";
import { useComments } from "@/features/comments/useComments";
import { useCreateComment } from "@/features/comments/useCreateComment";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
// components
import Loader from "@/components/Loader";
import Post from "@/features/posts/Post";
import Form from "@/features/comments/Form";
import CommentsList from "@/features/comments/CommentsList";
// context
import { ActiveCommentProvider } from "@/context/ActiveCommentContext";

const PostPage = () => {
    const { postId } = useParams();
    const { data, isLoadingPost } = usePost(postId!);
    const { dataComments, isLoadingComments, fetchNextPage, isFetchingNextPage } = useComments(postId!);
    const { isCreating, createComment } = useCreateComment();
    const { ref } = useInfiniteScroll(fetchNextPage);

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
                        label="Send"
                        placeholder="Write a comment..."
                    />
                    {dataComments && dataComments.pages.map(currentPage => (
                        <ul key={currentPage.page}>
                            <ActiveCommentProvider>
                                <CommentsList postId={postId!} comments={currentPage.comments} />
                            </ActiveCommentProvider>
                        </ul>
                    ))}
                    <div ref={ref}>
                        {isFetchingNextPage && <Loader className="size-10 mt-10" />}
                    </div>
                </>
            )}
        </main >
    )
}

export default PostPage;