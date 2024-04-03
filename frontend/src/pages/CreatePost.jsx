
// hooks
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "../hooks/usePostContext";
// components
import Loader from "../components/Loader";
// services
import { createPost } from "../services/postApi";
// yup validation
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// assets
import { PencilLine, Send } from "lucide-react";

// post validation schema
const PostSchema = yup.object({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Description is required")
});

const CreatePost = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({ resolver: yupResolver(PostSchema) });
    const { dispatch } = usePostContext();

    const handleCreate = async ({ title, content }) => {
        try {
            const post = await createPost({ title, content });
            dispatch({ type: "post/created", payload: post });
            navigate("/");
        } catch (error) {
            setError("root", { type: "server", message: error.message });
        }
    }

    return (
        <>
            <form className="sm:w-[700px]" onSubmit={handleSubmit(handleCreate)}>
                <div className="flex items-center justify-center gap-2">
                    <PencilLine className="text-white" />
                    <h1 className="text-white text-center text-2xl font-medium tracking-wide">Create a new question</h1>
                </div>
                <div className="relative">
                    <input {...register("title")} type="text" autoComplete="off" autoFocus placeholder="Write title..." className="form-input" />
                    <PencilLine className="input-icon" />
                    {errors.title && <p className="form-error">{errors.title.message}</p>}
                </div>
                <div className="relative">
                    <textarea {...register("content")} type="text" placeholder="Describe your problem..." />
                    {errors.content && <p className="form-error">{errors.content.message}</p>}
                    {errors.root?.type === "server" && <p className="form-error">{errors.root.message}</p>}
                </div>
                <button className="form-button" disabled={isSubmitting}>
                    {isSubmitting ? <Loader color="text-red-400" /> : "Create"}
                    <Send className="icon" />
                </button>
            </form>
        </>
    )
}

export default CreatePost;