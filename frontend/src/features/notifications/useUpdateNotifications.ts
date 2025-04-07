// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { updateNotificationsApi } from "@/services/notificationsApi";

export function useUpdateNotifications() {
    const queryClient = useQueryClient();

    const { isPending: isUpdating, mutate: updateNotifications } = useMutation({
        mutationFn: updateNotificationsApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { updateNotifications, isUpdating };
}