// types
import { TPost } from "@/lib/types/types";
// hooks
import { usePosts } from "@/features/posts/usePosts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
// components
import Post from "@/features/posts/Post";
import Loader from "@/components/Loader";

const PostsList = () => {
    const { data, fetchNextPage, isFetchingNextPage, isPending } = usePosts();
    const { ref } = useInfiniteScroll(fetchNextPage);

    if (isPending) return <Loader className="size-12 mt-40" />

    return (
        <>
            <h1 className="font-medium text-xl mb-4">Latest questions:</h1>
            {data && data.pages[0].results === 0 && <p className="text-sm text-center">There are no posts.</p >}
            {data && data.pages.map(currentPage => (
                <ul key={currentPage.page}>
                    {currentPage.posts.map((post: TPost) => (
                        <li key={post._id}>
                            <Post post={post} />
                        </li>
                    ))}
                </ul>
            ))}
            <div ref={ref}>
                {isFetchingNextPage && <Loader className="size-10 mt-10" />}
            </div>
        </>
    )
}

export default PostsList;