// lib
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';

const Upvote = ({ upvoteCount }: { upvoteCount: number }) => {
    return (
        <div className={cn("group flex flex-col items-center border-r border-gray-300 pr-4", upvoteCount > 0 ? "text-blue-600" : "text-gray-600")}>
            <button
                area-label="Upvote"
                className='cursor-pointer'
            >
                <ChevronUp className="group-hover:-translate-y-1 transition-all duration-300 ease-in-out" />
                <span>{upvoteCount}</span>
            </button>
        </div>
    )
}

export default Upvote;