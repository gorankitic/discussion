// lib
import { useQuery } from "@tanstack/react-query";
// api service
import { getPostApi } from "@/services/postsApi";

export function usePost(postId: string) {
    const { data, isPending: isLoadingPost } = useQuery({
        queryKey: ["post", postId],
        queryFn: () => getPostApi(postId),
    });

    return { data, isLoadingPost };
}