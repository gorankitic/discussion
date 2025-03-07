// lib
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// hooks
import { useLogout } from "@/features/authentication/useLogout";
// api service
import { updatePasswordApi } from "@/services/authApi";

export function useUpdatePassword() {
    const { signOut } = useLogout();

    const { mutate: updatePassword, isPending } = useMutation({
        mutationFn: updatePasswordApi,
        onSuccess: () => {
            toast.success(`Your password has been changed. Please sign in again.`);
            signOut();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { updatePassword, isPending };
}