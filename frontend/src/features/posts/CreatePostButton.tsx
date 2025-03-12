// lib
import { useState } from "react";
import { PencilLine, Plus } from "lucide-react";
// components
import CreatePostForm from "@/features/posts/CreatePostForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


const CreatePostButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex gap-1 items-center py-1 px-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md shadow-md focus:outline-none transition duration-100 cursor-pointer">
                <Plus className="size-5" />
                <span>Add new post</span>
            </DialogTrigger>
            <DialogContent className="!max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-center gap-2">
                        <PencilLine className="size-5" />
                        <span>Create a new post</span>
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <CreatePostForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}
export default CreatePostButton;