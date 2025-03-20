// lib
import { useInfiniteQuery } from "@tanstack/react-query";
// api service
import { getPostsApi } from "@/services/postsApi";

export const usePosts = () => {
    const { data, isPending, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: ({ pageParam }) => getPostsApi(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.hasMorePages ? pages.length + 1 : undefined;
        }
    });

    return { data, isPending, error, fetchNextPage, isFetchingNextPage }
}