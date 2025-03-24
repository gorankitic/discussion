// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { upvoteCommentApi } from "@/services/upvotesApi";

export function useCreateUpvote() {
    const queryClient = useQueryClient();

    const { isPending: isUpvoting, mutate: createUpvote } = useMutation({
        mutationFn: upvoteCommentApi,
        onSuccess: () => {
            toast.success("Comment upvoted!");
            queryClient.invalidateQueries({ queryKey: ["comments"] });

        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { createUpvote, isUpvoting };
}