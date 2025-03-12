export type User = {
    _id: string,
    name: string,
    email: string,
    photoUrl?: string,
    role: string,
    isVerified: boolean
}

export type Post = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    user: User
}