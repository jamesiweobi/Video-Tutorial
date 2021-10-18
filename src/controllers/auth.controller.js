const AppError = require('../utils/handle.errors');
const authService = require('../services/auth.service');

class AuthController {
    constructor() {}
    async signUp(req, res, next) {
        try {
            const result = await authService.signUp(req.body, next);
            res.status(result.statusCode).json({
                status: result.status,
                user: result.user,
                message: result.message,
            });
        } catch (err) {
            // next(new AppError(err.message, 500));
        }
    }

    async login(req, res, next) {
        try {
            const result = await authService.login(req.body);
            return res.status(result.statusCode).send({
                status: result.status,
                message: result.message,
                user: result.user,
            });
        } catch (err) {
            next(new AppError(err.message, 200));
            // console.log('👀👀👀👀👀👀😍', err);
        }
    }
}
module.exports = new AuthController();
