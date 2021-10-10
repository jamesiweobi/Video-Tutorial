const AppError = require('../utils/handle.errors');
const authService = require('../services/auth.service');

class AuthController {
    constructor() {}
    async signUp(req, res, next) {
        try {
            const result = await authService.signUp(req.body, next);
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (err) {
            // next(new AppError(err.message, 500));
        }
    }

    async login(req, res, next) {
        try {
            const result = await authService.login(req.body, next);
            console.log(result);
            return res.status(result.statusCode || 200).json({
                status: result.status || 'success',
                message: result.message || 'User logged in.',
                user: result.user,
            });
        } catch (err) {
            console.log('👀👀👀👀👀👀😍', err);
        }
    }
}
module.exports = new AuthController();
