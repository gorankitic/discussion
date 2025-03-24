// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { removeUpvoteCommentApi } from "@/services/upvotesApi";

export function useRemoveUpvote() {
    const queryClient = useQueryClient();

    const { isPending: isRemoving, mutate: removeUpvote } = useMutation({
        mutationFn: removeUpvoteCommentApi,
        onSuccess: () => {
            toast.success("Comment upvote has been removed!");
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { removeUpvote, isRemoving };
}