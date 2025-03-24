export type TUser = {
    _id: string,
    name: string,
    email: string,
    photoUrl?: string,
    role: string,
    isVerified: boolean
}

export type TPost = {
    _id: string,
    title: string,
    content: string,
    createdAt: string,
    user: TUser
}

export type TComment = {
    _id: string,
    content: string,
    user: TUser,
    post: TPost,
    parent: TPost | null,
    createdAt: string,
    updatedAt: string,
    upvoteCount: number,
    hasUpvoted: boolean
    nestedComments: TComment[] | null,
}