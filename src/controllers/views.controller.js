const AppError = require('../utils/handle.errors');
const authService = require('../services/auth.service');
const courseService = require('../services/course.service');

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

    async createCourse(req, res, next) {
        const id = req.params.id;
        const user = await authService.findUser(id);
        res.render('create-course', { username: user.username, id: user.id });
    }

    async courseDetails(req, res, next) {
        const id = req.params.id;
        const courseId = req.params.course;
        const user = await authService.findUser(id);
        const course = await courseService.findCourse(courseId);
        console.log(course.course, '<<<and>>>', user.username);
        res.render('course-details', {
            course: course.course,
            client: user,
        });
    }
}

module.exports = new ViewsController();
