const courseService = require('../services/course.service');
const AppError = require('../utils/handle.errors');

class CourseController {
    constructor() {}

    async createCourse(req, res, next) {
        try {
            const result = await courseService.createCourse(req.body);
            res.status(result.statusCode).json({
                status: result.status,
                message: result.message,
                user: result.course,
            });
        } catch (err) {
            return new AppError(
                'Internal server issues, please try again later.',
                500
            );
        }
    }

    async findCourse(req, res, next) {
        const id = req.params.id;
        try {
            const result = await courseService.findCourse(id);
            return res.status(result.statusCode).json({
                status: result.status || 'success',
                message: result.message || 'ourse successfully created.',
                course: result.course,
            });
        } catch (err) {
            console.log(err);
            return next(
                new AppError(
                    'Internal server issues, please try again later.',
                    500
                )
            );
        }
    }

    async findAllCourse(req, res, next) {
        try {
            const result = await courseService.findAllCourse();
            return res.status(result.statusCode).json({
                status: result.status || 'success',
                message: result.message || 'ourse successfully created.',
                course: result.course,
            });
        } catch (err) {
            console.log(err);
            return next(
                new AppError(
                    'Internal server issues, please try again later.',
                    500
                )
            );
        }
    }

    async updateCourse(req, res, next) {
        try {
            const result = await courseService.courseUpdate(req.body);
            return res.status(result.statusCode).json({
                status: result.status || 'success',
                message: result.message || 'ourse successfully created.',
                course: result.course,
            });
        } catch (err) {
            console.log(err);
            return next(
                new AppError(
                    'Internal server issues, please try again later.',
                    500
                )
            );
        }
    }
    async deleteCourse(req, res, next) {
        const id = req.params.id;
        const deleleCo = await courseService.deleteCourse(id);
        res.status(200).json({
            status: 'success',
            message: 'ourse successfully deleted.',
            result: deleleCo,
        });
    }

    async enrollCourse(req, res, next) {
        const courseId = req.body.courseId;
        const userId = req.body.userId;
        try {
            const result = await courseService.enrolledCourse(courseId, userId);
            return res.status(result.statusCode).json({
                status: result.status,
                message: result.message,
                course: result.course,
            });
        } catch (err) {
            return next(new AppError(err.message, 500));
        }
    }
}
module.exports = new CourseController();
