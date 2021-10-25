const Users = require('../models/user.model');
const AppError = require('../utils/handle.errors');
const {
    signupValidation,
    loginValidation,
} = require('../utils/Joi.validators.utils');
const bcrypt = require('bcryptjs');
const { signToken } = require('../utils/token.utils');

class AuthService {
    constructor() {
        this.Users = Users;
    }

    async signUp(body, next) {
        const result = {};
        const { username, password, repeatPassword } = body;
        const hash = await bcrypt.hash(password, 10);

        const user = { username, password, repeatPassword };
        const { error } = signupValidation(user);
        try {
            const userExists = await this.Users.findOne({
                username: username,
            });
            console.log(userExists, 'inside signup');
            if (userExists) {
                result.message = 'This Username is taken!';
                result.statusCode = 200;
                result.status = 'Failed';
                return result;
            }
            if (error) {
                let message = error.details[0].message;
                if (message.includes('repeatPassword')) {
                    result.message =
                        'Confirm-Password must be the same as password';
                    result.statusCode = 200;
                    result.status = 'Failed';
                    return result;
                }
                result.message = message;
                result.statusCode = 200;
                result.status = 'Failed';
                return result;
            }
            user.password = hash;
            user.repeatPassword = undefined;
            const newUser = await this.Users.create({ ...user });
            await newUser.save();
            newUser.password = undefined;
            result.message = 'User signup successful';
            result.statusCode = 200;
            result.status = 'Success';
            result.user = newUser;
            return result;
        } catch (err) {
            next(new AppError(err.message, 200));
        }
    }

    async login(body) {
        const { username, password } = body;
        const result = {};
        try {
            const user = await this.Users.findOne({
                username: username,
            });
            if (!user) {
                result.message = 'This User does not exist!';
                result.statusCode = 200;
                result.status = 'Failed';
                return result;
            }
            const invalidPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!invalidPassword) {
                result.message = 'Username or Password wrong!';
                result.statusCode = 200;
                result.status = 'Failed';
                return result;
            }
            const token = await signToken(user._id);
            user.token = token;
            result.message = 'Logged in Successfully';
            result.statusCode = 200;
            result.status = 'Success';
            result.user = user;
            return result;
        } catch (err) {}
    }

    async findUser(id) {
        const user = await this.Users.findOne({
            _id: id,
        }).lean();
        if (!user) return 'User not found!';
        return user;
    }
}

module.exports = new AuthService();
