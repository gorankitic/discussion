// lib
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideIcon, PencilLine, Send } from "lucide-react";
// types
import { commentSchema, CommentSchema } from "@/lib/types/schemas";
// components
import Loader from "@/components/Loader";

interface FormProps {
    onSubmit: (data: CommentSchema) => void,
    isLoading: boolean,
    placeholder?: string
    defaultValue?: string,
    label: string,
    icon?: LucideIcon,
    iconPosition?: "left" | "right"
}

const Form = ({ onSubmit, isLoading, defaultValue = "", placeholder, label, icon = Send, iconPosition = "right" }: FormProps) => {
    const Icon = icon;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentSchema>({
        resolver: zodResolver(commentSchema),
        defaultValues: { content: defaultValue }
    });

    const handleFormSubmit = (data: CommentSchema) => {
        onSubmit(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex gap-3 items-center">
            <div className="relative w-full">
                <input
                    {...register("content")}
                    type="text"
                    name="content"
                    placeholder={placeholder}
                    autoComplete="off"
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-1 rounded-md bg-white placeholder-gray-400 border border-gray-300 focus:outline-blue-600"
                />
                <PencilLine className="size-4 absolute left-3 top-[9px] text-gray-500 pointer-events-none" />
            </div>
            <button
                disabled={isLoading}
                className="flex gap-1 items-center justify-center w-36 py-1 px-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md shadow-md focus:outline-none cursor-pointer"
            >
                {isLoading ? <Loader className="size-5 border-blue-50" /> : (
                    <>
                        {iconPosition === "left" && <Icon className="size-4 text-blue-50" />}
                        <span>{label}</span>
                        {iconPosition === "right" && <Icon className="size-4 text-blue-50" />}
                    </>
                )}
            </button>
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </form>
    )
}

export default Form;