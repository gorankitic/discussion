// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { createPostApi } from "@/services/postsApi";

export function useCreatePost(setOpen: (open: boolean) => void) {
    const queryClient = useQueryClient();

    const { isPending, mutate: createPost } = useMutation({
        mutationFn: createPostApi,
        onSuccess: () => {
            toast.success("Post created successfully.");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { createPost, isPending };
}