// lib
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
// types
import { forgotPasswordSchema, ForgotPasswordSchema } from "@/lib/types";
// components
import AuthCard from "@/features/authentication/AuthCard";
// api service
import { forgotPasswordApi } from "@/services/authApi";
// icons
import { Mail, Send } from "lucide-react";

const ForgotPasswordForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ForgotPasswordSchema>({ resolver: zodResolver(forgotPasswordSchema) });

    const { mutate: forgotPassword, isPending } = useMutation({
        mutationFn: forgotPasswordApi,
        onSuccess: (data) => {
            toast.success(data.message);
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const onSubmit = (data: ForgotPasswordSchema) => {
        forgotPassword(data);
    }
    return (
        <AuthCard
            title="Forgot password?"
            backLinkHref="/signin"
            label="Get back to sign in"
        >
            <p className="mb-5 -mt-5 text-center text-gray-500 text-sm">Submit your email address and we will send you a reset password link</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                    <input
                        {...register("email")}
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        disabled={isPending}
                        className="w-full pl-10 pr-4 py-1 rounded-md bg-white placeholder-gray-400 border border-gray-300 focus:outline-blue-600"
                    />
                    <Mail className="size-4 absolute left-3 top-[9px] text-gray-500 pointer-events-none" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isPending}
                    className="flex gap-2 items-center justify-center mx-auto w-full py-2 px-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md shadow-md focus:outline-none transition duration-100 mt-5 cursor-pointer"
                >
                    {isPending ? <div className='size-5 animate-spin rounded-full border-b-2 border-white'></div> : (
                        <>
                            <span>Send reset link</span>
                            <Send className='size-4 text-blue-50' />
                        </>
                    )}
                </motion.button>
            </form>
        </AuthCard>
    )
}
export default ForgotPasswordForm;