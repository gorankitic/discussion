// lib
import { ForgotPasswordSchema, ResetPasswordSchema, SignInSchema, SignUpSchema, UpdatePasswordSchema, UpdateUserSchema } from "@/lib/types";

const baseApiUrl = import.meta.env.VITE_API_URL;

export const signUpApi = async ({ name, email, password }: SignUpSchema) => {
    // The Fetch API does not throw an error for HTTP error statuses (e.g., 400 or 500). 
    // Check response.ok to handle this server errors when the promise gets resolved
    // The Fetch API rejects the promise if there's a network error, the request is aborted, or CORS errors
    const response = await fetch(`${baseApiUrl}/api/v1/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const signInApi = async ({ email, password }: SignInSchema) => {
    const response = await fetch(`${baseApiUrl}/api/v1/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const signOutApi = async () => {
    const response = await fetch(`${baseApiUrl}/api/v1/users/signout`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const verifyEmailApi = async (verificationToken: string) => {
    const response = await fetch(`${baseApiUrl}/api/v1/users/verifyEmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ verificationToken })
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const newVerifyEmailApi = async () => {
    const response = await fetch(`${baseApiUrl}/api/v1/users/newVerification`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const forgotPasswordApi = async (data: ForgotPasswordSchema) => {
    const response = await fetch(`${baseApiUrl}/api/v1/users/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const resetPasswordApi = async ({ data, resetToken }: { data: ResetPasswordSchema, resetToken: string }) => {
    const response = await fetch(`${baseApiUrl}/api/v1/users/resetPassword/${resetToken}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const getUserApi = async () => {
    const response = await fetch(`${baseApiUrl}/api/v1/users`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const updateUserApi = async (data: UpdateUserSchema) => {
    const response = await fetch(`${baseApiUrl}/api/v1/users/updateMe`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export const updatePasswordApi = async (data: UpdatePasswordSchema) => {
    const response = await fetch(`${baseApiUrl}/api/v1/users/updatePassword`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}