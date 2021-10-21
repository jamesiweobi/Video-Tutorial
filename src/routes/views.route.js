const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller');

router.get('/logout/:id', viewsController.logOut);
router.get('/update-course/:userId/:courseId', viewsController.editCourse);
router.get('/course-details/:userId/:courseId', viewsController.courseDetails);
router.get('/create-course/:id', viewsController.createCourse);
router.get('/signup-user', viewsController.signUp);
router.get('/login-user', viewsController.login);
router.get('/', viewsController.homePage).get('/:id', viewsController.homePage);

module.exports = router;
