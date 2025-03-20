// lib
import { useState } from "react";
// utils
import { cn } from "@/lib/utils";
// types
import { TComment } from "@/lib/types/types";
// components
import CommentsList from "@/features/comments/CommentsList";

interface NestedCommentsProps {
    nestedComments: TComment[],
    postId: string,
}

const NestedComments = ({ nestedComments, postId }: NestedCommentsProps) => {
    const [hideNested, setHideNested] = useState(false);

    if (nestedComments.length === 0) return null;

    return (
        <>
            <div className={cn("flex gap-5", { "hidden": hideNested })}>
                <button
                    className="collapse-line"
                    onClick={() => setHideNested(true)}
                />
                <CommentsList comments={nestedComments} postId={postId} />
            </div>
            <button
                className={cn("text-blue-600 mb-4 text-sm cursor-pointer underline", { "hidden": !hideNested })}
                onClick={() => setHideNested(false)}
            >
                Show replies
            </button>
        </>
    )
}

export default NestedComments;