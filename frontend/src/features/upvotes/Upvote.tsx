// lib
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
// hooks
import { useCreateUpvote } from '@/features/upvotes/useCreateUpvote';
import { useRemoveUpvote } from '@/features/upvotes/useRemoveUpvote';

interface UpvoteProps {
    upvoteCount: number,
    hasUpvoted: boolean,
    commentId: string
}

const Upvote = ({ upvoteCount, hasUpvoted, commentId }: UpvoteProps) => {
    const { createUpvote } = useCreateUpvote();
    const { removeUpvote } = useRemoveUpvote();

    const handleUpvote = () => {
        !hasUpvoted ? createUpvote({ commentId }) : removeUpvote({ commentId });
    }

    return (
        <div className={cn("group flex flex-col items-center border-r border-gray-300 pr-4", hasUpvoted ? "text-blue-600" : "text-gray-600")}>
            <button
                area-label="Upvote"
                className='cursor-pointer'
                onClick={handleUpvote}
            >
                <ChevronUp className="group-hover:-translate-y-1 transition-all duration-300 ease-in-out" />
                <span>{upvoteCount}</span>
            </button>
        </div>
    )
}

export default Upvote;