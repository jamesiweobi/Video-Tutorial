const courseService = require('../services/course.service');
const AppError = require('../utils/handle.errors');

class CourseController {
    constructor() {}

    async createCourse(req, res, next) {
        try {
            const result = await courseService.createCourse(req.body, next);
            console.log(result);
            return res.status(result.statusCode).json({
                status: result.status || 'success',
                message: result.message || 'ourse successfully created.',
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
}
module.exports = new CourseController();
