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
    // TODO: Fixed the default on isPublic
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    // enrolledUsers: [
    //     {
    //         type: mongoose.Schema.ObjectID,
    //         ref: 'Users',
    //     },
    // ],
    // createdBy: {
    //     type: mongoose.Schema.ObjectID,
    //     ref: 'Users',
    // },
});

const Course = mongoose.model('Courses', courseSchema);

module.exports = Course;
