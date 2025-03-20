// lib
import { useQuery } from "@tanstack/react-query";
// api service
import { getCommentsApi } from "@/services/commentsApi";

export function useComments(postId: string) {
    const { data: dataComments, isPending: isLoadingComments } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => getCommentsApi(postId!),
    });

    return { dataComments, isLoadingComments };
}