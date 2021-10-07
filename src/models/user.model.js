const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

mongoose.Schema.Types.String.set('trim', true);

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username must be included.'],
        unique: true,
        // trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a Valid password.'],
        minlength: [6, 'Password should be at least 6 characters long.'],
    },
    repeatPassword: {
        type: String,
        required: [true, 'Please enter  a Repeat Password'],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!',
        },
    },
    enrolledCourses: {
        type: [
            {
                type: mongoose.Schema.ObjectID,
                ref: 'Courses',
            },
        ],
    },
});

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete repeatPassword field
    this.repeatPassword = undefined;
    next();
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
