// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { createCommentApi } from "@/services/commentsApi";

export function useCreateComment(setShowReplyForm?: (value: boolean) => void) {
    const queryClient = useQueryClient();

    const { isPending: isCreating, mutate: createComment } = useMutation({
        mutationFn: createCommentApi,
        onSuccess: () => {
            toast.success("Comment created successfully.");
            queryClient.invalidateQueries({ queryKey: ["comments"] });
            if (setShowReplyForm) {
                setShowReplyForm(false);
            }
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { createComment, isCreating };
}