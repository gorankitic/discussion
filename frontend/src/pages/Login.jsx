// react
import { useRef } from "react";
// hooks
import { useLogin } from "../hooks/useLogin";
// context
import { useAuthContext } from "../context/AuthContext";
// components
import Loader from "../components/Loader";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useLogin();
    const { dispatch, error, isLoading } = useAuthContext();

    const handleSignIn = (e) => {
        e.preventDefault();
        // Better client-side validation with yup
        if (!emailRef.current.value || !passwordRef.current.value) {
            dispatch({ type: "rejected", payload: "Credentials are required." });
            return;
        }
        login(emailRef.current.value, passwordRef.current.value);
    }

    return (
        <form onSubmit={handleSignIn} className='flex flex-col gap-6 w-[30rem] my-20 mx-auto'>
            <h1 className='text-3xl text-center'>Sign in</h1>
            <input type="email" placeholder='Email' ref={emailRef} />
            <input type="password" placeholder='Password' ref={passwordRef} />
            {error && <p className="text-red-600">{error}</p>}
            <button disabled={isLoading} className="btn ml-auto">
                {isLoading ? <Loader /> : "Sign in"}
            </button>
        </form>
    )
}

export default Login