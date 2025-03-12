// lib
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, KeyRound, Send } from "lucide-react";
// types
import { updatePasswordSchema, UpdatePasswordSchema } from "@/lib/types/schemas";
// hooks
import { useUpdatePassword } from "@/features/authentication/useUpdatePassword";

const UpdatePasswordForm = () => {
    const { updatePassword, isPending } = useUpdatePassword();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<UpdatePasswordSchema>({ resolver: zodResolver(updatePasswordSchema) });

    const onSubmit = (data: UpdatePasswordSchema) => {
        updatePassword(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
                <div className="relative">
                    <input
                        {...register("currentPassword")}
                        type={passwordVisible ? "text" : "password"}
                        name="currentPassword"
                        placeholder="Current password"
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
                    {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
                </div>
                <div className="relative">
                    <input
                        {...register("password")}
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        placeholder="New password"
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
            </div>
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isPending}
                className="flex gap-2 items-center justify-center ml-auto w-48 p-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm rounded-md shadow-md focus:outline-none transition duration-100 mt-5 cursor-pointer"
            >
                {isPending ? <div className='size-5 animate-spin rounded-full border-b-2 border-white'></div> : (
                    <>
                        <span>Update password</span>
                        <Send className='size-4 text-blue-50' />
                    </>
                )}
            </motion.button>
        </form>
    )
}

export default UpdatePasswordForm;