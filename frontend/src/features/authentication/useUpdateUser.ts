// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { updateUserApi } from "@/services/authApi";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: updateUserApi,
        onSuccess: () => {
            toast.success(`Your account has been successfully updated!`);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { updateUser, isPending };
}