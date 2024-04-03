
// hooks
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
// yup validation
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// assets
import { UserRound, Mail, KeyRound, Send, Eye, EyeOff, LogIn } from "lucide-react";

// validation schema
const SignupSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Provide a valid email"),
    password: yup.string().required("Password is required")
});

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { dispatch } = useAuthContext();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({ resolver: yupResolver(SignupSchema) });

    const onSubmit = async (data) => {
        const { name, email, password } = data;
        try {
            // Fetch API won't throw an error on 400 and 500 response 
            // Check response.ok to handle this server errors when the promise gets resolved
            // Fetch will throw an error when promise gets rejected (example: network or CORS errors)
            // So handle all errors in one place in catch
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message);
            }
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'login', payload: json });
            }
        } catch (error) {
            setError("root", { type: "server", message: error.message });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-white text-center text-2xl font-medium tracking-wide">Sign up to start Discussion</h1>
            <div className="relative">
                <input {...register("name")} type="text" autoComplete="off" placeholder="Name" autoFocus className="form-input" />
                <UserRound className="input-icon" />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>
            <div className="relative">
                <input {...register("email")} type="text" autoComplete="off" placeholder="Email" className="form-input" />
                <Mail className="input-icon" />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>
            <div className="relative">
                <input {...register("password")} type={passwordVisible ? "text" : "password"} placeholder="Password" className="form-input" />
                <KeyRound className="input-icon" />
                {passwordVisible
                    ?
                    <EyeOff onClick={() => setPasswordVisible(false)} className="input-icon-eye" />
                    :
                    <Eye onClick={() => setPasswordVisible(true)} className="input-icon-eye" />
                }
                {errors.password && <p className="form-error">{errors.password.message}</p>}
                {errors.root?.type === "server" && <p className="form-error">{errors.root.message}</p>}
            </div>
            <button className="form-button" disabled={isSubmitting}>
                {isSubmitting ? <Loader /> : "Sign up"}
                <Send className="icon" />
            </button>
            <Link to='/login' className="-mt-4 flex gap-1 justify-center items-center text-white">
                <LogIn />
                <p className="hover:underline">Already have an account?</p>
            </Link>
        </form>
    )
}

export default Signup;