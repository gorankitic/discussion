// models
const Comment = require("../models/commentModel");

// Recursive function to find all nested comments for root comment
const getNestedCommentsRecursively = async (parentId) => {
    // Find all nested comments
    const nestedComments = await Comment.find({ parent: parentId }).lean();
    if (!nestedComments.length) return [];

    // Recursively find all nested comments for each comment
    return await Promise.all(
        nestedComments.map(async (nestedComment) => ({
            ...nestedComment,
            nestedComments: await getNestedCommentsRecursively(nestedComment._id),
        }))
    );
};

module.exports = { getNestedCommentsRecursively }