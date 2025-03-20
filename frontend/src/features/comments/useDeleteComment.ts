// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { deleteCommentApi } from "@/services/commentsApi";

export function useDeleteComment() {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteComment } = useMutation({
        mutationFn: deleteCommentApi,
        onSuccess: () => {
            toast.success("The comment and all its nested replies were deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { deleteComment, isDeleting };
}