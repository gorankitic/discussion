// lib
const { getCommentsWithUpvotes } = require("./getCommentsWithUpvotes");

const getNestedCommentsRecursively = async ({ parentCommentId, postId, userId }) => {
    // Fetch all nested comments for the given parentId
    const nestedComments = await getCommentsWithUpvotes({ postId, parentCommentId, userId });

    if (!nestedComments.length) return [];

    // Recursively find all nested comments for each comment
    return await Promise.all(
        nestedComments.map(async (nestedComment) => ({
            ...nestedComment,
            nestedComments: await getNestedCommentsRecursively({ parentCommentId: nestedComment._id, postId, userId }),
        }))
    );
};

module.exports = { getNestedCommentsRecursively }