// lib
import { Link } from "react-router";
import { formatDistance } from "date-fns";
// types
import type { TPost } from "@/lib/types/types";
// hooks
import { useUser } from "@/features/authentication/useUser";
import { useDeletePost } from "@/features/posts/useDeletePost";
// components
import UserAvatar from "@/components/UserAvatar";
import CreateEditPost from "@/features/posts/CreateUpdatePost";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

const Post = ({ post }: { post: TPost }) => {
    const { user } = useUser();
    const { deletePost, isDeleting } = useDeletePost();

    return (
        <article className="border border-neutral-300 rounded-md py-2 px-3 mb-3">
            <header className="flex items-center border-b border-neutral-300 pb-1 text-xs">
                <UserAvatar name={post.user.name} photoUrl={post.user.photoUrl} size="size-8" />
                <div className="ml-auto flex items-center gap-2">
                    <p>{formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}</p>
                    {post.user._id === user._id && (
                        <>
                            <CreateEditPost postToUpdate={post} />
                            <ConfirmDeleteModal
                                title="Are you sure you want to delete this post?"
                                description="All its comments will also be deleted. This action cannot be undone."
                                isProcessing={isDeleting}
                                onDelete={() => deletePost(post._id)}
                            />
                        </>
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