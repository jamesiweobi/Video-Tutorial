const express = require('express');
const app = express();
const dataBaseConnection = require('./db/db.mongoDB');
const router = require('./routes/router');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const path = require('path');
// Mongoose Connection
dataBaseConnection();

// BodyPerser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
morgan('dev');

// Views
app.engine(
    'hbs',
    hbs({
        extname: 'hbs',
        defaultLayout: 'layout',
        layoutsDir: __dirname + '/views/layouts',
        helpers: {
            loadUrl: function (aString, bString) {
                return `/course-details?userId=${aString}&course=${bString}`;
            },
            homePage: function (aString) {
                return `/course/${aString}`;
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
            deletecourse: function (id) {
                return `deletecourse('${id}')`;
            },
            likecourse: function (id) {
                return `likecourse('${id}')`;
            },
            editUrl: function (aString, bString) {
                return `/edit-course?userId=${aString}&course=${bString}`;
            },
            ingredients: function (aString) {
                return aString.reduce((word, index) => {
                    word + ` ${index}`;
                }, '');
            },
        },
    })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

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
