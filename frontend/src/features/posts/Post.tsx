// lib
import { Link } from "react-router";
import { formatDistance } from "date-fns";
// types
import type { Post } from "@/lib/types";
// hooks
import { useUser } from "@/features/authentication/useUser";
// components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DeletePost from "@/features/posts/DeletePost";

const Post = ({ post }: { post: Post }) => {
    const { user } = useUser();

    return (
        <article className="border border-neutral-300 rounded-md py-2 px-3 mb-4">
            <header className="flex items-center border-b border-neutral-300 pb-1 text-xs">
                <div className="flex items-center gap-2">
                    <Avatar className="relative size-8 object-cover" aria-label={`Avatar of ${post.user.name}`}>
                        {post.user.photoUrl && (
                            <img src={post.user.photoUrl} />
                        )}
                        {!post.user.photoUrl && (
                            <AvatarFallback>
                                {post.user.name?.charAt(0).toLocaleUpperCase()}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <p className="text-sm font-medium">{post.user.name}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <p>{formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}</p>
                    {post.user._id === user._id && (
                        <DeletePost postId={post._id} />
                    )}
                </div>
            </header>
            <Link key={post._id} to={`/posts/${post._id}`}>
                <main className="my-2 text-sm">
                    <h1 className="text-lg font-medium mb-1">{post.title}</h1>
                    <p>{post.content}</p>
                </main>
            </Link>
        </article>
    )
}

export default Post;