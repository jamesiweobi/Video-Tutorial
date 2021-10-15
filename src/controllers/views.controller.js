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
        const { doc } = user;
        console.log(user);
        res.render('create-course', {
            layout: 'layout',
            username: user.username,
            id: user.id,
        });
    }

    async courseDetails(req, res, next) {
        const id = req.params.id;
        const courseId = req.params.course;
        const user = await authService.findUser(id);
        const course = await courseService.findCourse(courseId);
        let isTrue = false;
        if (id === courseId) isTrue = true;
        res.render('course-details', {
            layout: 'layout',
            data: user,
            course: course.course,
            isTrue: isTrue,
        });
    }

    async editCourse(req, res, next) {
        const id = req.params.id;
        const courseId = req.params.course;
        const user = await authService.findUser(id);
        const course = await courseService.findCourse(courseId);
        res.render('update-course', {
            layout: 'layout',
            data: user,
            course: course.course,
        });
    }
}

module.exports = new ViewsController();
