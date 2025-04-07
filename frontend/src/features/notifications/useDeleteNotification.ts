// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { deleteNotificationApi } from "@/services/notificationsApi";

export function useDeleteNotification() {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteNotification } = useMutation({
        mutationFn: deleteNotificationApi,
        onSuccess: () => {
            toast.success("The notification deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { deleteNotification, isDeleting };
}