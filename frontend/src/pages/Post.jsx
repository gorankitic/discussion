// hooks
import { useEffect } from "react"
import { useParams } from "react-router-dom";
// context
import { usePostContext } from "../context/PostContext";
import { useCommentContext } from "../context/CommentContext";
// components
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
// services
import { createComment } from "../services/commentApi";

const Post = () => {
    const { postId } = useParams();
    const { getPost, post } = usePostContext();
    const { rootComments, dispatch, error } = useCommentContext();

    useEffect(() => {
        getPost(postId);
    }, [getPost, postId]);

    const handleCreate = async (content) => {
        try {
            const comment = await createComment({ content, postId, parentId: null });
            dispatch({ type: "comment/created", payload: comment });
        } catch (error) {
            dispatch({ type: "rejected", payload: error.message });
        }
    }

    return (
        <main className="pb-10">
            <h1 className="font-medium text-2xl mb-2">{post?.title}</h1>
            <p>{post?.content}</p>
            <CommentForm label="Post" placeholder="Write a comment..." handleSubmit={handleCreate} />

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

export default Post;