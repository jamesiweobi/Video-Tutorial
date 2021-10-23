const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    enrolledUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
});

// ################

// working on why the createdBy isn't populating

// // ###############

courseSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'createdBy',
        select: '_id',
    }).populate({
        path: 'enrolledUsers',
        select: 'username',
    });
    next();
});

const Course = mongoose.model('Courses', courseSchema);

module.exports = Course;

// Post.updateOne(
//     {
//         _id: req.params.postid,
//         likes: { $ne: { user: authorizedData.jwt_payload.patient._id } },
//     },
//     { $push: { likes: authorizedData.jwt_payload.patient._id } }
// )
//     .then((re) => res.json(re))
//     .catch((err) => res.json('already liked'));
