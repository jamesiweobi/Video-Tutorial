const { isUrl } = require('express-validator');
const Course = require('../models/course.model');
const { courseValidator } = require('../utils/Joi.validators.utils');
const AppError = require('../utils/handle.errors');

class CourseService {
    constructor() {
        this.Course = Course;
    }

    async createCourse(body, next) {
        const result = {};
        const newCourse = {
            title: body.title,
            description: body.description,
            imageUrl: body.imageUrl,
            // isPublic: body.isPublic,
        };
        const { error } = courseValidator(newCourse);
        newCourse.isPublic = body.isPublic;
        try {
            console.log(error);
            if (!error) {
                result.message = 'Course created successfully';
                result.statusCode = 200;
                result.status = 'Success';
                const savedCourse = await this.Course.create({
                    ...newCourse,
                });
                console.log(savedCourse);
                await savedCourse.save();
                result.course = savedCourse;
                return result;
            }

            result.message = error.details[0].message;
            result.statusCode = 400;
            result.status = 'Failed';
            return result;
            // let message = error.details[0].message;
            // next(new AppError(message, 400));
        } catch (err) {
            next(new AppError(err.message, 400));
        }
    }

    async findCourse(id) {
        const result = {};
        const course = await this.Course.findById(id);
        if (course) {
            result.message = 'Success';
            result.statusCode = 200;
            result.status = 'Success';
            result.course = course;
            return result;
        }
        result.message = 'Failed';
        result.statusCode = 400;
        result.status = 'Failed';
        return result;
    }

    async findAllCourse(id) {
        const result = {};
        const course = await this.Course.find({});
        if (course) {
            result.message = 'Success loaded all courses';
            result.statusCode = 200;
            result.status = 'Success';
            result.course = course;
            return result;
        }
        result.message = 'Failed';
        result.statusCode = 400;
        result.status = 'Failed';
        return result;
    }
}

module.exports = new CourseService();
