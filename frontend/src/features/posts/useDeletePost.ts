// lib
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { deletePostApi } from "@/services/postsApi";

export function useDeletePost() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isPending: isDeleting, mutate: deletePost } = useMutation({
        mutationFn: deletePostApi,
        onSuccess: () => {
            toast.success("Post deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { deletePost, isDeleting };
}