// lib
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { signInApi } from "@/services/authApi";

export function useSignIn() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: signIn, isPending } = useMutation({
        mutationFn: signInApi,
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user);
            if (!user.isVerified) {
                navigate("/verify-email");
            } else {
                navigate("/", { replace: true });
            }
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { signIn, isPending };
}