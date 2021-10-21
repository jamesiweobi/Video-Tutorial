const express = require('express');
const app = express();
const dataBaseConnection = require('./db/db.mongoDB');
const router = require('./routes/router');
const hbs = require('express-handlebars');
const path = require('path');

dataBaseConnection();

// BodyPerser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Views
app.use(express.static(__dirname + '/views/static'));
app.set('views', path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');
app.engine(
    'hbs',
    hbs({
        extname: 'hbs',
        defaultLayout: 'layout.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
        helpers: {
            courseDetails: function (aString, bString) {
                return `/course-details/${aString}/${bString}`;
            },
            homePage: function (aString) {
                return `/${aString}`;
            },
            sharecourse: function (sString) {
                let result = '/create-course/' + sString;
                return result;
            },
            courseSrc: function (sString) {
                return `/courses-page/` + sString;
            },
            logOutSrc: function (sString) {
                return `/logout/` + sString;
            },
            editcourse: function (id) {
                return `/course/${id}`;
            },
            deleteCourse: function (id) {
                return `deleteCourse('${id}')`;
            },
            likecourse: function (id) {
                return `likecourse('${id}')`;
            },
            updateCourse: function (aString, bString) {
                return `/update-course/${aString}/${bString}`;
            },
            enrollCourse: function (userId, courseId) {
                const mString = userId + ' , ' + courseId;
                return `enrollCourse(${mString})`;
            },
            ingredients: function (aString) {
                return aString.reduce((word, index) => {
                    word + ` ${index}`;
                }, '');
            },
        },
    })
);

/*
User route = '/api/v1/users'
Courses route = '/api/v1/courses'
Views route = '/'
*/
app.use('/', router);
// app.use('/api/v1/users');

// Global Error Handling
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

module.exports = app;
