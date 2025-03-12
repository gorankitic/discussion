// lib
import { getPostsApi } from "@/services/postsApi";
// api service
import { useQuery } from "@tanstack/react-query";

export const usePosts = () => {
    const { data, isPending } = useQuery({
        queryKey: ["posts"],
        queryFn: getPostsApi,
    });

    return { data, isPending }
}