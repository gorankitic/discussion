import { getCommentsApi } from "@/services/commentsApi";
import { getPostApi } from "@/services/postsApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"

// Render individual comments with nested replies recursively
const renderNestedComments = (comments: any) => {
    return comments.map((comment: any) => (
        <div key={comment._id} className="ml-4">
            <div className="comment">
                <p><strong>{comment.user.name}</strong>: {comment.content}</p>
            </div>
            {comment.nestedComments && comment.nestedComments.length > 0 && (
                <div className="nested-comments">
                    {renderNestedComments(comment.nestedComments)}
                </div>
            )}
        </div>
    ));
};


const PostPage = () => {
    const { postId } = useParams();

    const { data } = useQuery({
        queryKey: ["post"],
        queryFn: () => getPostApi(postId!),
    });

    const { data: dataComments } = useQuery({
        queryKey: ["comments"],
        queryFn: () => getCommentsApi(postId!),
    });

    console.log(dataComments)

    return (
        <div className="flex-1">
            <div className="flex flex-col gap-5">
                <p>{data?.post.title}</p>
                <p>{data?.post.content}</p>
                <p>{data?.post.createdAt}</p>
            </div>
            <div>
                <h1>COMMENTS: </h1>
                {dataComments?.comments.map((comment: any) => (
                    <div key={comment._id} className="root-comment" >
                        <div className="comment">
                            <p><strong>{comment.user.name}</strong>: {comment.content}</p>
                        </div>
                        <div>
                            {renderNestedComments(comment.nestedComments)}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
export default PostPage