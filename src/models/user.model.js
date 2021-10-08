const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    repeatPassword: {
        type: String,
    },
    // enrolledCourses: {
    //     type: {
    //         type: mongoose.Schema.ObjectID,
    //         ref: 'Courses',
    //     },
    // },
});

userSchema.pre('save', async function (next) {
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete repeatPassword field
    this.repeatPassword = undefined;
    next();
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
