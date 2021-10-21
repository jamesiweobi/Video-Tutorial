const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const fs = require('fs');
const Course = require('./src/models/course.model');
const DB = process.env.URL.toString();
mongoose
    .connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB connection successful'));

const courses = fs.readFileSync(`${__dirname}/course-sample.json`, 'utf8');

// Import data
const importData = async () => {
    try {
        const data = JSON.parse(courses);
        await Course.create(data);
        console.log('Data successfully imported');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};
const deleteData = async () => {
    try {
        await Course.deleteMany();
        console.log('Deleted data successfully');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};
const command = process.argv[2];
if (command === 'import') importData();
if (command === 'delete') deleteData();
