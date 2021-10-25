const authService = require('../services/auth.service');
const courseService = require('../services/course.service');

class ViewsController {
    constructor() {}

    async courseDetails(req, res) {
        const id = req.params.userId;
        const courseId = req.params.courseId;
        const user = await authService.findUser(id);
        const courseRes = await courseService.findCourse(courseId);
        const { course } = courseRes;
        let isEnrolled = course?.enrolledUsers.some((item) => {
            return item.username === user.username;
        });
        console.log(id, 'd');
        let creator = false;
        if (id != course?.createdBy._id) {
            creator = true;
            console.log(creator, 'the creator');
        }
        res.render('course-details', {
            // layout: 'layout',
            data: user,
            course: courseRes.course,
            creator: creator,
            isEnrolled: isEnrolled,
        });
    }

    async homePage(req, res) {
        const id = req.params.id;
        const courses = await courseService.findAllCourse();
        const user = await authService.findUser(id);
        const course = courses.course.map((item) => {
            return { ...item, userId: id };
        });
        if (!id) {
            return res.render('home', {
                layout: 'layout',
                course: course,
            });
        }
        return res.render('home', {
            layout: 'layout',
            course: course,
            user: user,
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
        res.cookie('Token', '', {
            httpOnly: true,
            maxAge: 1000,
        });
        res.redirect('/');
    }
}

module.exports = new ViewsController();
