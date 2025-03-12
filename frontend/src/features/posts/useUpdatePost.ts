// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { updatePostApi } from "@/services/postsApi";

export function useUpdatePost(setOpen: (open: boolean) => void) {
    const queryClient = useQueryClient();

    const { isPending: isUpdating, mutate: updatePost } = useMutation({
        mutationFn: updatePostApi,
        onSuccess: () => {
            toast.success("Post created successfully.");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { updatePost, isUpdating };
}