// lib
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// api service
import { signUpApi } from "@/services/authApi";

export function useSignup() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: signUp, isPending } = useMutation({
        mutationFn: signUpApi,
        onSuccess: (user) => {
            toast.success(`Hello ${user.name}, your account has been created! Please check your email to verify your account.`);
            queryClient.setQueryData(["user"], user);
            navigate("/verify-email", { replace: true });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { signUp, isPending };
}