// lib
import { useState } from "react";
import { Send, Trash } from "lucide-react";
// components
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type ConfirmDeleteModalProps = {
    title: string;
    onDelete: () => void;
    description?: string;
    isProcessing?: boolean;
};

const ConfirmDeleteModal = ({ title, onDelete, isProcessing = false, description = "This action cannot be undone." }: ConfirmDeleteModalProps) => {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        onDelete();
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="cursor-pointer">
                    <Trash className="size-4 hover:text-red-500" />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">{title}</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center">{description}</DialogDescription>
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
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <div className="size-5 animate-spin rounded-full border-b-2 border-white"></div>
                            ) : (
                                <>
                                    <span>Delete</span>
                                    <Send className="size-4 text-blue-50" />
                                </>
                            )}
                        </button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDeleteModal;
