const Users = require('../models/user.model');
const AppError = require('../utils/handle.errors');

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
                throw next(new AppError('Username unavailable', 401));
            }
            const newUser = await this.Users.create({ ...user });
            newUser.validateSync();
            newUser.save();
            delete newUser.password;
            console.log(newUser);
            return newUser;
        } catch (err) {
            console.log('💖💖', err);
            throw next(new AppError(err.message, 400));
        }
    }
}

module.exports = new AuthService();
