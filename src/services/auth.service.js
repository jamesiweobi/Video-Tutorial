const Users = require('../models/user.model');
const AppError = require('../utils/handle.errors');
const { signupValidation } = require('../utils/Joi.validators.utils');

class AuthService {
    constructor() {
        this.Users = Users;
    }

    async signUp(body, next) {
        const { username, password, repeatPassword } = body;
        const user = { username, password, repeatPassword };
        try {
            const userExists = await this.Users.findOne({ username: username });
            if (userExists) {
                next(new AppError('Username unavailable, pick another.', 401));
            }
            const { error } = signupValidation(body);
            if (error) {
                console.log('true, true');
                let message = error.details[0].message;
                if (message.includes('repeatPassword')) {
                    message = 'Confirm-Password must be the same as password';
                }
                next(new AppError(message, 400));
            }

            const newUser = await this.Users.create({ ...user });
            await newUser.save();
            newUser.password = undefined;
            return newUser;
        } catch (err) {
            next(new AppError(err.message, 400));
        }
    }
}

module.exports = new AuthService();
