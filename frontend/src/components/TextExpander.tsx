// lib
import { useState } from "react";


interface TextExpanderProps {
    children?: string;
    charCount?: number;
}

const TextExpander = ({ children = "", charCount = 100 }: TextExpanderProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // If the number of characters in the original children text is greater than charCount
    // Text is too long and needs to be "truncated" — shortened with "..."
    const isTruncated = children.length > charCount;
    const displayText = isExpanded || !isTruncated ? children : children.slice(0, charCount) + "...";

    if (!children) return null;

    return (
        <span>
            {displayText}{" "}
            {isTruncated && (
                <button
                    className="text-blue-500 border-b border-blue-500 leading-3 cursor-pointer text-sm"
                    onClick={(e) => {
                        e.preventDefault(); // prevent link click
                        e.stopPropagation(); // stop bubbling
                        setIsExpanded((prev) => !prev);
                    }}
                >
                    {isExpanded ? "View less" : "View more"}
                </button>
            )}
        </span>
    );
};

export default TextExpander;