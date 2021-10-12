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
