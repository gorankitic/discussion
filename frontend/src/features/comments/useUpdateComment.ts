// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { updateCommentApi } from "@/services/commentsApi";

export function useUpdateComment() {
    const queryClient = useQueryClient();

    const { isPending: isUpdatingComment, mutate: updateComment } = useMutation({
        mutationFn: updateCommentApi,
        onSuccess: () => {
            toast.success("Comment updated successfully.");
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { updateComment, isUpdatingComment };
}