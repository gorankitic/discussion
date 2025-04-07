// lib
import { motion } from "framer-motion";
import { Send } from "lucide-react";
// components
import AuthCard from "@/features/authentication/AuthCard";
//hooks
import { useEmailVerification } from "@/features/authentication/useVerifyEmail";

const VerifyEmailForm = () => {
    const {
        message,
        inputRefs,
        isPending,
        isPendingNewCode,
        handleInput,
        handleKeyDown,
        handlePaste,
        submitHandler,
        newVerifyEmail,
    } = useEmailVerification();

    return (
        <AuthCard
            title="Verify your email"
            backLinkHref=""
            label="Enter the 6 digit code sent to your email address"
        >
            <form onSubmit={submitHandler}>
                <div className="flex gap-5 justify-center px-3 mt-8">
                    {Array(6).fill("").map((_, index) => (
                        <input
                            key={index}
                            name={`input ${index}`}
                            type="text"
                            ref={(el) => { if (el) inputRefs.current[index] = el }}
                            maxLength={1}
                            onInput={(e) => handleInput(index, (e.target as HTMLInputElement).value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={(e) => handlePaste(e)}
                            className={`size-11 bg-white text-center text-2xl text-gray-600 shadow-md border-2 border-gray-300 rounded-md 
                                focus:border-blue-600 focus:outline-none`}
                        />
                    ))}
                </div>
                {!isPendingNewCode && message && (
                    <p
                        onClick={() => newVerifyEmail()}
                        className="text-blue-600 text-center mt-5 text-sm hover:underline cursor-pointer"
                    >
                        {message}
                    </p>
                )}
                {isPendingNewCode && <div className='mx-auto mt-5 size-5 animate-spin rounded-full border-b-2 border-blue-500'></div>}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isPending && isPendingNewCode}
                    className="flex gap-2 items-center justify-center mx-auto w-full mt-8 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md shadow-md focus:outline-none transition duration-100 cursor-pointer"
                >
                    {isPending ? <div className='size-5 animate-spin rounded-full border-b-2 border-white'></div> : (
                        <>
                            <span>Verify email</span>
                            <Send className="size-4 text-white" />
                        </>
                    )}
                </motion.button>
            </form>
        </AuthCard>
    )
}

export default VerifyEmailForm;