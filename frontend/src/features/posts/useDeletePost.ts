// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { deletePostApi } from "@/services/postsApi";

export function useDeletePost(setOpen: (open: boolean) => void) {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deletePost } = useMutation({
        mutationFn: deletePostApi,
        onSuccess: () => {
            toast.success("Post deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { deletePost, isDeleting };
}