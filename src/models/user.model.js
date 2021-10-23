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
});

// userSchema.pre('save', async function (next) {
//     // Hash the password with cost of 12
//     const salt = await bcrypt.genSalt();
//     let hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     // Delete repeatPassword field
//     this.repeatPassword = undefined;
//     next();
// });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
