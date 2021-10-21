const AppError = require('../utils/handle.errors');
const authService = require('../services/auth.service');
const courseService = require('../services/course.service');

class ViewsController {
    constructor() {}

    async courseDetails(req, res) {
        const id = req.params.id;
        const courseId = req.params.courseId;
        const user = await authService.findUser(id);
        const course = await courseService.findCourse(courseId);
        let isTrue = true;
        let isEnrolled = false;
        if (id === courseId) isTrue = true;
        res.render('course-details', {
            layout: 'layout',
            data: user,
            course: course.course,
            isTrue: isTrue,
            isEnrolled: isEnrolled,
        });
    }

    async homePage(req, res) {
        const id = req.params.id;
        const courses = await courseService.findAllCourse();
        const course = courses.course.map((item) => {
            return { ...item, userId: id };
        });
        if (id) {
            const user = await authService.findUser(id);
            return res.render('home', {
                layout: 'layout',
                course: course,
                user: user,
            });
        }
        return res.render('home', {
            layout: 'layout',
            course: course,
        });
    }

    async login(req, res) {
        res.render('login', {
            layout: 'layout',
        });
    }
    async signUp(req, res) {
        res.render('signUp', {
            layout: 'layout',
        });
    }

    async createCourse(req, res) {
        const id = req.params.id;
        const user = await authService.findUser(id);
        res.render('create-course', {
            layout: 'layout',
            username: user.username,
            id: user.id,
        });
    }

    async editCourse(req, res, next) {
        const id = req.params.userId;
        const courseId = req.params.courseId;
        const user = await authService.findUser(id);
        const course = await courseService.findCourse(courseId);
        res.render('update-course', {
            layout: 'layout',
            user: user,
            course: course.course,
        });
    }

    async logOut(req, res) {
        const id = req.params.id;

        res.redirect('/');
    }
}

module.exports = new ViewsController();
