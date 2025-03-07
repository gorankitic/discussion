import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOutApi } from "@/services/authApi";
import { useNavigate } from "react-router";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: signOut, isPending } = useMutation({
        mutationFn: signOutApi,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/signin", { replace: true });
        },
    });

    return { signOut, isPending };
}