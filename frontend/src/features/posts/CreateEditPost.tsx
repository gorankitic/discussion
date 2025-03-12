// lib
import { useState } from "react";
import { PencilLine, Plus, SquarePen } from "lucide-react";
// types
import { TPost } from "@/lib/types/types";
// components
import CreateEditPostForm from "@/features/posts/CreateEditPostForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CreateEditPostProps {
    postToEdit?: TPost
}

const CreateEditPost = ({ postToEdit }: CreateEditPostProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center gap-2">
                {!postToEdit?._id && (
                    <>
                        <Plus className="size-5" />
                        <span>Add new post</span>
                    </>
                )}
                {postToEdit?._id && (
                    <SquarePen className="size-4 cursor-pointer" />
                )}
            </DialogTrigger>
            <DialogContent className="!max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-center gap-2">
                        <PencilLine className="size-5" />
                        {!postToEdit?._id && <span>Create a new post</span>}
                        {postToEdit?._id && <span>Edit post</span>}
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <CreateEditPostForm setOpen={setOpen} postToEdit={postToEdit} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateEditPost;