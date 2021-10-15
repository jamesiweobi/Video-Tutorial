const Users = require('../models/user.model');
const AppError = require('../utils/handle.errors');
const {
    signupValidation,
    loginValidation,
} = require('../utils/Joi.validators.utils');
const bcrypt = require('bcryptjs');

class AuthService {
    constructor() {
        this.Users = Users;
    }

    async signUp(body, next) {
        const { username, password, repeatPassword } = body;
        const user = { username, password, repeatPassword };
        const { error } = signupValidation(user);
        try {
            const userExists = await this.Users.findOne({
                username: username,
            });
            if (userExists) {
                next(new AppError('Username unavailable, pick another.', 401));
            }
            if (error) {
                let message = error.details[0].message;
                if (message.includes('repeatPassword')) {
                    message = 'Confirm-Password must be the same as password';
                }
                next(new AppError(message, 400));
            }

            const newUser = await this.Users.create({ ...user });
            await newUser.save();
            newUser.password = undefined;
            newUser;
        } catch (err) {
            next(new AppError(err.message, 400));
        }
    }

    async login(body, next) {
        const result = {};
        const { error } = await loginValidation({ ...body });
        if (error) {
            // console.log('👀👀👀👀👀👀', error);
            result.message = error.details[0].message;
            result.statusCode = 400;
            result.status = 'Failed';
            return result;
            // next(new AppError(error.details[0].message, 400));
        }
        try {
            const user = await this.Users.findOne({
                username: body.username,
            }).lean();
            if (!user) {
                result.message = 'No such User';
                result.statusCode = 400;
                result.status = 'Failed';
                // next(new AppError('Email or Password wrong', 400));
                return result;
            }

            // TODO: fix bycrypt for user password confirmation
            // const invalidPassword = await bcrypt.compare(
            //     body.password,
            //     user.password
            // );

            // console.log('sss', invalidPassword);
            // if (!invalidPassword) {
            //     result.message = 'Username or Password wrong';
            //     result.statusCode = 400;
            //     result.status = 'Failed';

            //     return result;
            // }
            // // const token = await signToken(user._id);
            result.user = user;
            return user;
        } catch (err) {
            // next(new AppError(err.message, 400));
        }
    }

    async findUser(id) {
        const user = await this.Users.findOne({
            id: id,
        }).lean();
        if (!user) return 'User not found!';
        return user;
    }
}

module.exports = new AuthService();
