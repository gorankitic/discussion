// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { updateCommentApi } from "@/services/commentsApi";

export function useUpdateComment(setShowUpdateForm: (value: boolean) => void) {
    const queryClient = useQueryClient();

    const { isPending: isUpdatingComment, mutate: updateComment } = useMutation({
        mutationFn: updateCommentApi,
        onSuccess: () => {
            toast.success("Comment updated successfully.");
            queryClient.invalidateQueries({ queryKey: ["comments"] });
            setShowUpdateForm(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { updateComment, isUpdatingComment };
}