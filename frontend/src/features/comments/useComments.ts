// lib
import { useInfiniteQuery } from "@tanstack/react-query";
// api service
import { getCommentsApi } from "@/services/commentsApi";

export function useComments(postId: string) {
    const { data, isPending, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["comments", postId],
        queryFn: ({ pageParam }) => getCommentsApi(postId, pageParam),
        enabled: !!postId,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.hasMorePages ? pages.length + 1 : undefined;
        }
    });

    return { dataComments: data, isLoadingComments: isPending, error, fetchNextPage, isFetchingNextPage }
}