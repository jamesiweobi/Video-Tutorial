const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller');

router.get('/', viewsController.homePage);
router.get('/login-user', viewsController.login);
router.get('/signup-user', viewsController.signUp);
router.get('/create-course/:id', viewsController.createCourse);
router.get('/course-details/:id/:course', viewsController.courseDetails);
router.get('/update-course/:id/:course', viewsController.courseDetails);

module.exports = router;
