// lib
import { useState } from "react";
import { Send, Trash2 } from "lucide-react";
// components
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// hooks
import { useDeletePost } from "@/features/posts/useDeletePost";

const DeletePost = ({ postId }: { postId: string }) => {
    const [open, setOpen] = useState(false);
    const { deletePost, isDeleting } = useDeletePost(setOpen);

    const handleDelete = () => {
        deletePost(postId);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="cursor-pointer">
                    <Trash2 className="size-4 hover:text-red-500" />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Are you sure you want to delete this post?</DialogTitle>
                </DialogHeader>
                <DialogDescription />
                <DialogFooter>
                    <div className="flex items-center gap-5">
                        <button
                            onClick={handleCancel}
                            className="cursor-pointer py-1 px-3 w-28 border rounded-md shadow-md focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex gap-2 items-center justify-center py-1 px-3 w-28 bg-red-500 text-white rounded-md shadow-md focus:outline-none cursor-pointer"
                            disabled={isDeleting}
                        >
                            {isDeleting ? <div className='size-5 animate-spin rounded-full border-b-2 border-white'></div> : (
                                <>
                                    <span>Delete</span>
                                    <Send className='size-4 text-blue-50' />
                                </>
                            )}
                        </button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default DeletePost;