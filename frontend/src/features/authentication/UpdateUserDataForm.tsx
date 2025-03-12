// lib
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Send, Upload, User } from "lucide-react";
// types
import { updateUserSchema, UpdateUserSchema } from "@/lib/types/schemas";
// hooks
import { useUser } from "@/features/authentication/useUser";
import { useUpdateUser } from "@/features/authentication/useUpdateUser";

const UpdateUserDataForm = () => {
    const { user } = useUser();
    const { updateUser, isPending } = useUpdateUser();
    const [isUploading, setIsUploading] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<UpdateUserSchema>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            email: user?.email,
            name: user?.name,
            photoUrl: user?.photoUrl || ""
        }
    });

    const onSubmit = (data: UpdateUserSchema) => {
        updateUser(data);
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            try {
                const fileName = `avatar-${user._id}-${Math.random()}`;
                const { data } = await supabase.storage.from("profileImage").upload(fileName, file);
                setValue("photoUrl", `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${data?.fullPath}`)
                toast.success("Image uploaded successfully. Update your profile.")
            } catch (error) {
                toast.error("Uploading image failed. Please try again later");
            } finally {
                setIsUploading(false);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
                <div className="relative">
                    <input
                        {...register("email")}
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        disabled
                        className="w-full pl-10 pr-4 py-1 rounded-md bg-white placeholder-gray-400 border border-gray-300 focus:outline-blue-600 disabled:bg-gray-100"
                    />
                    <Mail className="size-4 absolute left-3 top-[9px] text-gray-500 pointer-events-none" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div className="relative">
                    <input
                        {...register("name")}
                        type="text"
                        name="name"
                        placeholder="Name"
                        autoComplete="off"
                        disabled={isPending}
                        className="w-full pl-10 pr-4 py-1 rounded-md bg-white placeholder-gray-400 border border-gray-300 focus:outline-blue-600"
                    />
                    <User className="size-4 absolute left-3 top-[9px] text-gray-500 pointer-events-none" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <input
                        {...register("photoUrl")}
                        type="file"
                        id="avatar"
                        name="photoUrl"
                        accept="image/*"
                        disabled={isUploading || isPending}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="avatar"
                        className="w-48 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm p-2 rounded-md shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                        {isUploading ? <div className='size-5 animate-spin rounded-full border-b-2 border-white'></div> : (
                            <>
                                <span>Upload avatar</span>
                                <Upload className='size-4 text-white' />
                            </>
                        )}
                    </label>
                    {errors.photoUrl && <p className="text-red-500 text-sm mt-1">{errors.photoUrl.message}</p>}
                </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isUploading || isPending}
                className="flex gap-2 items-center justify-center ml-auto mt-5 w-48 p-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm rounded-md shadow-md focus:outline-none transition duration-100 cursor-pointer"
            >
                {isPending ? <div className='size-5 animate-spin rounded-full border-b-2 border-white'></div> : (
                    <>
                        <span>Update account</span>
                        <Send className='size-4 text-blue-50' />
                    </>
                )}
            </motion.button>
        </form>
    )
}
export default UpdateUserDataForm;