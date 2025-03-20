import * as z from "zod";

export const signInSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});
export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }).max(50),
    email: z.string().min(1, { message: "Email is required" }).max(50).email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must have at least 8 characters" }).max(50),
});
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
    password: z.string().min(1, { message: "Password is required" }).max(50),
});
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const updateUserSchema = z.object({
    name: z.string().max(50).optional(),
    photoUrl: z.string().url().optional(),
    email: z.string().email().optional()
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const updatePasswordSchema = z.object({
    currentPassword: z.string(),
    password: z.string().min(8, { message: "Password must have at least 8 characters...." }).max(50),
});
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;

export const postSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(50, { message: "Allowed 50 characters maximum" }),
    content: z.string().min(1, { message: "Description is required" }).max(200, { message: "Allowed 200 characters maximum" })
});
export type PostSchema = z.infer<typeof postSchema>;

export const commentSchema = z.object({
    content: z.string().min(1, { message: "Comment content is required" }).max(300, { message: "Allowed 300 characters maximum" })
});
export type CommentSchema = z.infer<typeof commentSchema>;
