// react
import { Link } from "react-router-dom";
// context
import { usePostContext } from "../context/PostContext";

const Homepage = () => {
    const { posts, error } = usePostContext();

    return (
        <main className="mt-20">
            {posts && posts.map(post => (
                <div key={post._id} className="mb-10">
                    <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </div>
            ))}
            {error && <p className="text-red-500">{error}</p>}
        </main>
    )
}

export default Homepage;