import React from "react";
// components
import Comment from "./Comment";

const CommentList = ({ comments }) => {

    return (
        <main className="grow">
            {comments.map(comment => (
                <React.Fragment key={comment._id}>
                    <Comment comment={comment} />
                </React.Fragment>
            ))}
        </main>
    )
}

export default CommentList;