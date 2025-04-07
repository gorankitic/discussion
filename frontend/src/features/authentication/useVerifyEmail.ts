// lib
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// types
import { TUser } from "@/lib/types/types";
// api service
import { newVerifyEmailApi, verifyEmailApi } from "@/services/authApi";

export const useEmailVerification = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const queryClient = useQueryClient();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { mutate: verifyEmail, isPending } = useMutation({
        mutationFn: verifyEmailApi,
        onSuccess: (response) => {
            toast.success(response.message);
            queryClient.setQueryData(["user"], (prev: TUser) => ({
                ...prev,
                isVerified: true,
            }));
            navigate("/", { replace: true });
        },
        onError: (error) => {
            toast.error(error.message);
            setMessage("Send new code to email?");
        }
    });

    const { mutate: newVerifyEmail, isPending: isPendingNewCode } = useMutation({
        mutationFn: newVerifyEmailApi,
        onSuccess: (response) => {
            setMessage("");
            clearInputs();
            toast.success(response.message);
        },
        onError: (error) => {
            toast.error(error.message);
            setMessage("Send new code to email?");
        }
    });

    const handleInput = (index: number, value: string) => {
        if (!/^\d+$/.test(value)) {
            inputRefs.current[index]!.value = "";
            return;
        }
        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const clipboardData = e.clipboardData.getData("text");
        clipboardData.split("").slice(0, 6).forEach((digit, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index]!.value = digit;
            }
        });
        inputRefs.current[Math.min(clipboardData.length, 5)]?.focus();
    };

    const clearInputs = () => {
        inputRefs.current.forEach(input => input && (input.value = ""));
        inputRefs.current[0]?.focus();
    };

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const verificationCode = inputRefs.current.map(input => input?.value.trim()).join("");
        if (verificationCode.length !== 6) return;
        verifyEmail(verificationCode);
    };

    return {
        message,
        inputRefs,
        isPending,
        isPendingNewCode,
        handleInput,
        handleKeyDown,
        handlePaste,
        submitHandler,
        newVerifyEmail,
    };
};
