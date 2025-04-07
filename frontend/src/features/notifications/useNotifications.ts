// lib
import { useInfiniteQuery } from "@tanstack/react-query";
// api service
import { getNotificationsApi } from "@/services/notificationsApi";

export function useNotifications() {
    const { data, isPending, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["notifications"],
        queryFn: ({ pageParam }) => getNotificationsApi(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.hasMorePages ? pages.length + 1 : undefined;
        }
    });

    return { data, isPending, error, fetchNextPage, isFetchingNextPage }
}