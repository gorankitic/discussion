// components
import Post from "@/features/posts/Post";
// api service
import { usePosts } from "./usePosts";

const PostsList = () => {
    const { data } = usePosts();

    return (
        <>
            <h1 className="font-medium text-xl mb-4">Latest questions:</h1>
            <ul>
                {data && data.posts.length > 0 ? data.posts.map((post: any) => (
                    <li key={post._id}>
                        <Post post={post} />
                    </li>
                ))
                    :
                    <p className="text-sm text-center">There are no posts.</p>
                }
            </ul>
        </>
    )
}
export default PostsList;