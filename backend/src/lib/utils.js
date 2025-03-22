// modules
const mongoose = require("mongoose");
// models
const Comment = require("../models/commentModel");

const getCommentsWithUpvotes = async ({ postId, skip, limit, parentCommentId = null }) => {
    const matchCondition = parentCommentId ? { parent: parentCommentId } : { parent: null };

    const aggregationPipeline = [
        // Stage match filters the comments to only include those associated with a specific postId
        { $match: { post: new mongoose.Types.ObjectId(String(postId)), ...matchCondition } },
        { $sort: { createdAt: -1 } },
    ];

    // Only add pagination (skip and limit) for root comments (parent is null)
    if (!parentCommentId) {
        aggregationPipeline.push(
            { $skip: skip },
            { $limit: limit }
        );
    }

    aggregationPipeline.push(
        {
            // Lookup stage joins data from upvotes collection, matching on commentId
            // It temporarily create an array of upvote docs in each comment document
            $lookup: {
                from: 'upvotes',
                localField: '_id',
                foreignField: 'comment',
                as: 'upvotes', // Name of the array in the resulting documents
            },
        },
        {
            // addFields stage add a new field called upvoteCount to each comment document
            // upvoteCount field contains the number of upvotes for that comment 
            // $size operator count the number of elements in the upvotes array
            // $ifNull operator ensures that if there are no upvotes for a comment, the upvotes array is treated as [], preventing errors when calling $size
            $addFields: { upvoteCount: { $size: { $ifNull: ['$upvotes', []] } } }
        },
        {
            // Project stage the necessary fields
            // 0 exclude the upvotes array
            $project: { upvotes: 0 },
        },
        {
            // Populate the comment document with user data (name, photoUrl)
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
                pipeline: [{ $project: { name: 1, photoUrl: 1 } }]
            },
        },
        {
            // After the $lookup stage, the user will be an array (even if there's only one user)
            // $unwind stage deconstruct an array field (user)
            // Each element of that array results in a new document, keeping the original fields intact
            $unwind: { path: '$user', preserveNullAndEmptyArrays: true }
        }
    );

    const comments = await Comment.aggregate(aggregationPipeline);

    return comments;
}

const getNestedCommentsRecursively = async (parentCommentId, postId) => {
    // Fetch all nested comments for the given parentId
    const nestedComments = await getCommentsWithUpvotes({ postId, parentCommentId });

    if (!nestedComments.length) return [];

    // Recursively find all nested comments for each comment
    return await Promise.all(
        nestedComments.map(async (nestedComment) => ({
            ...nestedComment,
            nestedComments: await getNestedCommentsRecursively(nestedComment._id, postId),
        }))
    );
};

module.exports = { getNestedCommentsRecursively, getCommentsWithUpvotes }