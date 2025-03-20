// lib
import { useState } from "react";
import { PencilLine, Plus, SquarePen } from "lucide-react";
// types
import { TPost } from "@/lib/types/types";
// components
import CreateUpdatePostForm from "@/features/posts/CreateUpdatePostForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CreateUpdatePostProps {
    postToUpdate?: TPost
}

const CreateUpdatePost = ({ postToUpdate }: CreateUpdatePostProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center gap-2 cursor-pointer">
                {!postToUpdate?._id && (
                    <>
                        <Plus className="size-5" />
                        <span>Add new post</span>
                    </>
                )}
                {postToUpdate?._id && (
                    <SquarePen className="size-4 cursor-pointer" />
                )}
            </DialogTrigger>
            <DialogContent className="!max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-center gap-2">
                        <PencilLine className="size-5" />
                        {!postToUpdate?._id && <span>Create a new post</span>}
                        {postToUpdate?._id && <span>Update post</span>}
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <CreateUpdatePostForm setOpen={setOpen} postToUpdate={postToUpdate} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateUpdatePost;