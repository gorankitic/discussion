// hooks
import { useEffect } from "react"
import { useParams } from "react-router-dom";
// context
import { usePostContext } from "../hooks/usePostContext";
import { useCommentContext } from "../hooks/useCommentContext";
// components
import Form from "../components/Form";
import CommentList from "../components/CommentList";
import BigLoader from "../components/BigLoader";
// services
import { getPost } from "../services/postApi";
import { createComment } from "../services/commentApi";
// assets
import { Send } from "lucide-react";
import Post from "../components/Post";

const PostPage = () => {
    const { postId } = useParams();
    const { isLoading, post, dispatch: dispatchPost } = usePostContext();
    const { rootComments, dispatch: dispatchComment, error } = useCommentContext();

    useEffect(() => {
        (async () => {
            dispatchPost({ type: "loading" });
            try {
                const json = await getPost(postId);
                dispatchPost({ type: "post/loaded", payload: json.post });
                dispatchComment({ type: "comments/loaded", payload: json.post.comments });
            } catch (error) {
                dispatchPost({ type: "rejected", payload: error.message });
            }
        })();
        return () => {
            dispatchPost({ type: "post/loaded", payload: null });
            dispatchComment({ type: "comments/loaded", payload: [] });
        }
    }, [postId, dispatchPost, dispatchComment]);

    const handleCreate = async (content) => {
        try {
            const comment = await createComment({ content, postId, parentId: null });
            dispatchComment({ type: "comment/created", payload: comment });
        } catch (error) {
            dispatchComment({ type: "rejected", payload: error.message });
        }
    }

    if (isLoading) {
        return (
            <div className="text-center mt-20">
                <BigLoader />
            </div>
        )
    }

    return (
        <main className="pb-2 mt-6">
            {post && <Post post={post} isPage={true} />}
            <Form label="Post" placeholder="Write a comment..." handleSubmit={handleCreate} Icon={Send} />

            {/* All global errors that can occur show here*/}
            {error && <p className="text-red-500">{error}</p>}
            <section className="mt-5">
                {rootComments != null && rootComments.length > 0 && (
                    <CommentList comments={rootComments} />
                )}
            </section>
        </main>
    )
}

export default PostPage;