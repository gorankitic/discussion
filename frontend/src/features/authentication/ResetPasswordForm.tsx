// lib
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Eye, EyeOff, KeyRound, Send } from "lucide-react";
// types
import { resetPasswordSchema, ResetPasswordSchema } from "@/lib/types/schemas";
// components
import AuthCard from "@/features/authentication/AuthCard";
// api service
import { resetPasswordApi } from "@/services/authApi";

const ResetPasswordForm = () => {
    const { resetToken } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordSchema>({ resolver: zodResolver(resetPasswordSchema) });

    const { mutate: resetPassword, isPending } = useMutation({
        mutationFn: resetPasswordApi,
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user);
            if (!user.isVerified) {
                navigate("/verify-email");
            } else {
                toast.success("Your password has been successfully changed.")
                navigate("/", { replace: true });
            }
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    if (!resetToken) {
        toast.error("Invalid reset token.");
        return;
    }

    const onSubmit = (data: ResetPasswordSchema) => {
        resetPassword({ data, resetToken });
    }

    return (
        <AuthCard
            title="Reset your password"
            backLinkHref="/forgot-password"
            label="Send new reset link"
        >
            <p className="mb-5 -mt-5 text-center text-gray-500 text-sm">Submit your email address and we will send you a reset password link</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                    <input
                        {...register("password")}
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        disabled={isPending}
                        className="w-full pl-10 pr-4 py-1 rounded-md bg-white placeholder-gray-400 border border-gray-300 focus:outline-blue-600"
                    />
                    <KeyRound className="size-4 absolute left-3 top-[9px] text-gray-500 pointer-events-none" />
                    {!passwordVisible ? (
                        <Eye
                            onClick={() => setPasswordVisible(prev => !prev)}
                            className="size-4 absolute right-3 top-[9px] text-gray-500 cursor-pointer"
                        />) : (
                        <EyeOff
                            onClick={() => setPasswordVisible(prev => !prev)}
                            className="size-4 absolute right-3 top-[9px] text-gray-500 cursor-pointer"
                        />
                    )}
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isPending}
                    className="flex gap-2 items-center justify-center mx-auto w-full py-2 px-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md shadow-md focus:outline-none transition duration-100 mt-5 cursor-pointer"
                >
                    {isPending ? <div className='size-5 animate-spin rounded-full border-b-2 border-white'></div> : (
                        <>
                            <span>Reset password</span>
                            <Send className='size-4 text-blue-50' />
                        </>
                    )}
                </motion.button>
            </form>
        </AuthCard>
    )
}
export default ResetPasswordForm;