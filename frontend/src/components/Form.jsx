// hooks
import { useState } from "react";
// components
import Loader from "./Loader";

const Form = ({ label, initialValue = "", handleSubmit, autoFocus = false, placeholder, Icon }) => {
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
                <button disabled={isLoading || content === ""} onClick={handleClick} className="btn flex justify-center items-center gap-[6px] w-24">
                    <Icon className="w-5 h-5" />
                    {isLoading ? <Loader color="text-neutral-100" /> : label}
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </>
    )
}

export default Form;