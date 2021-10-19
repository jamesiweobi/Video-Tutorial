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
            isPublic: body.isPublic,
        };
        const { error } = courseValidator(newCourse);
        try {
            if (!error) {
                console.log(error, 'to be created course');
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
            result.statusCode = 200;
            result.status = 'Failed';
            return result;
            // let message = error.details[0].message;
            // next(new AppError(message, 400));
        } catch (err) {
            next(new AppError(err.message, 200));
        }
    }

    async findCourse(id) {
        try {
            const result = {};
            const course = await this.Course.findById(id).lean();
            if (course) {
                result.message = 'Success, found the course';
                result.statusCode = 200;
                result.status = 'Success';
                result.course = course;
                return result;
            }
            result.message = 'Failed to fetch course';
            result.statusCode = 400;
            result.status = 'Failed';
            return result;
        } catch (err) {
            let result = {};
            result.message = 'Internal Server failure';
            result.statusCode = 400;
            result.status = 'Failed';
            return result;
        }
    }

    async findAllCourse(id) {
        const result = {};
        const course = await this.Course.find({}).lean();
        if (course) {
            result.message = 'Successfully loaded all courses';
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

    async courseUpdate(body) {
        const result = {};
        const id = body.id;

        const courseExists = await this.Course.findById(id).lean();
        if (!courseExists) {
            result.message = 'Failed to find course';
            result.statusCode = 400;
            result.status = 'Failed';
            return result;
        }
        const { error } = courseValidator({
            title: body.title,
            description: body.description,
            imageUrl: body.imageUrl,
        });
        if (error) {
            result.message = error.details[0].message;
            result.statusCode = 400;
            result.status = 'Failed';
            return result;
        }
        const course = await this.Course.findByIdAndUpdate(
            { id: id },
            { ...body },
            {
                new: true,
            }
        ).lean();
        result.message = 'Succesfully Updated the course';
        result.statusCode = 200;
        result.status = 'Success';
        result.course = course;
        return result;
    }

    async deleteCourse(id) {
        const deleted = await this.Course.findOneAndDelete(id).lean();
        return deleted;
    }

    async enrolledCourse(userId, courseId) {
        // TODO: Fix the enrolled course function
        // const enrolled = await
    }
}

module.exports = new CourseService();
