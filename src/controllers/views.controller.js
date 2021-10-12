const AppError = require('../utils/handle.errors');
const authService = require('../services/auth.service');

class ViewsController {
    constructor() {}

    async homePage(req, res, next) {
        res.render('home');
    }

    async login(req, res, next) {
        res.render('login');
    }
    async signUp(req, res, next) {
        res.render('signUp');
    }
}

module.exports = new ViewsController();
