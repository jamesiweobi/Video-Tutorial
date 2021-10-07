const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isUrl } = require('express-validator');

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Username must be included.'],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        minlength: [6, 'The description must be longer than 50 characters'],
        required: [true, 'A course must have a description'],
        trim: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [isUrl, 'Please enter a valid image URL.'],
    },
    isPublic: {
        type: Boolean,
        defualt: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    enrolledUsers: {
        type: [
            {
                type: mongoose.Schema.ObjectID,
                ref: 'Users',
            },
        ],
    },
    createdBy: {
        type: mongoose.Schema.ObjectID,
        ref: 'Users',
    },
});

const Course = mongoose.model('Courses', courseSchema);

module.exports = Course;
