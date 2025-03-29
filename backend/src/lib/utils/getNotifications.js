// models
const Notification = require("../../models/notificationsModel");

exports.getNotifications = ({ userId, skip, limit }) => {
    return Notification.aggregate([
        { $match: { recipient: userId } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "users",
                localField: "sender",
                foreignField: "_id",
                as: "sender",
                pipeline: [{ $project: { name: 1, photoUrl: 1 } }]
            }
        },
        { $unwind: "$sender" }, // Flatten sender array
        {
            $lookup: {
                from: "comments",
                localField: "comment",
                foreignField: "_id",
                as: "comment",
                pipeline: [{ $project: { content: 1 } }]
            }
        },
        { $unwind: { path: "$comment", preserveNullAndEmptyArrays: true } },
    ]);
}