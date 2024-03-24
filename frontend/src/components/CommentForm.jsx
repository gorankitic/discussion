// hooks
import { useState } from "react";
// components
import Loader from "./Loader";

const CommentForm = ({ label, initialValue = "", handleSubmit, autoFocus = false, placeholder }) => {
    const [content, setContent] = useState(initialValue);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);

        await handleSubmit(content);

        setContent("");
        setIsLoading(false);
        setError("");
    }

    return (
        <>
            <div className="flex gap-3 mt-4">
                <input
                    className="w-full"
                    type="text"
                    value={content}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    onChange={(e) => { setContent(e.target.value) }}
                />
                <button disabled={isLoading || content === ""} onClick={handleClick} className="btn w-24">
                    {isLoading ? <Loader /> : label}
                </button>
            </div>
            <span>{error && <p className="text-red-500">{error}</p>}</span>
        </>
    )
}

export default CommentForm;