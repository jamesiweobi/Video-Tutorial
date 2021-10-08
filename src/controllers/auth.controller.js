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
}
module.exports = new AuthController();
