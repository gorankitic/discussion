
// hooks
import { useCallback, useRef } from "react";
// components
import { Link } from "react-router-dom";
import Post from "./Post";
import BigLoader from "./BigLoader";
// context
import { usePostContext } from "../hooks/usePostContext";


const PostsList = () => {
    const { isLoading, posts, hasMorePages, dispatch, error } = usePostContext();

    const observer = useRef();
    const lastPostRef = useCallback((node) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMorePages) {
                dispatch({ type: "page/increment" });
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, dispatch, hasMorePages]);

    return (
        <>
            <h1 className="font-medium text-2xl mb-4">Latest questions:</h1>
            {error && <p className="text-red-500">{error}</p>}
            {posts ?
                posts.map((post, index) => {
                    if (posts.length === index + 1) {
                        return (
                            <Link ref={lastPostRef} key={post._id} to={`/posts/${post._id}`}>
                                <Post post={post} />
                            </Link>
                        )
                    } else {
                        return (
                            <Link key={post._id} to={`/posts/${post._id}`}>
                                <Post post={post} />
                            </Link>
                        )
                    }
                })
                :
                <p className="text-2xl">There are no posts.</p>
            }
            {isLoading && (
                <div className="text-center my-6">
                    <BigLoader />
                </div>
            )}
        </>
    )
}

export default PostsList;