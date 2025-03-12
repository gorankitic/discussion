export type TUser = {
    _id: string,
    name: string,
    email: string,
    photoUrl?: string,
    role: string,
    isVerified: boolean
}

export type TPost = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    user: TUser
}