// lib
import { useQuery } from "@tanstack/react-query";
// api service
import { getUserApi } from "@/services/authApi";

export function useUser() {
    const { isPending, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getUserApi,
        staleTime: Infinity
    });

    return { isPending, user };
}