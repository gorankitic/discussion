// lib
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLine, Send } from "lucide-react";
import { motion } from "framer-motion";
// types
import { TPost } from "@/lib/types/types";
import { PostSchema, postSchema } from "@/lib/types/schemas";
// hooks
import { useCreatePost } from "@/features/posts/useCreatePost";
import { useUpdatePost } from "@/features/posts/useUpdatePost";

interface CreateUpdatePostFormProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    postToUpdate?: TPost
}

const CreateUpdatePostForm = ({ setOpen, postToUpdate }: CreateUpdatePostFormProps) => {
    const { createPost, isCreating } = useCreatePost(setOpen);
    const { updatePost, isUpdating } = useUpdatePost(setOpen);
    const { register, handleSubmit, formState: { errors } } = useForm<PostSchema>({
        resolver: zodResolver(postSchema),
        defaultValues: postToUpdate ? postToUpdate : {}
    });

    const isWorking = isCreating || isUpdating;

    const onSubmit = (data: PostSchema) => {
        postToUpdate ? updatePost({ data, postId: postToUpdate._id }) : createPost(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
                <div className="relative">
                    <input
                        {...register("title")}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Write title..."
                        disabled={isWorking}
                        className="w-full pl-10 pr-4 py-1 rounded-md bg-white placeholder-gray-400 border border-gray-300 focus:outline-blue-600"
                    />
                    <PencilLine className="size-4 absolute left-3 top-[9px] text-gray-500 pointer-events-none" />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div className="relative">
                    <textarea
                        {...register("content")}
                        placeholder="Describe your problem..."
                        disabled={isWorking}
                        className="w-full pl-10 pr-4 py-1 min-h-60 rounded-md bg-white placeholder-gray-400 border border-gray-300 focus:outline-blue-600"
                    />
                    {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isWorking}
                className="flex gap-2 items-center justify-center mx-auto w-full py-2 px-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md shadow-md focus:outline-none transition duration-100 mt-5 cursor-pointer"
            >
                {isWorking ? <div className='size-5 animate-spin rounded-full border-b-2 border-white'></div> : (
                    <>
                        {!postToUpdate ? <span>Create new post</span> : <span>Update post</span>}
                        <Send className='size-4 text-blue-50' />
                    </>
                )}
            </motion.button>
        </form>
    )
}

export default CreateUpdatePostForm;