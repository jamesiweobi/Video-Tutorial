const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller');
const { authToken } = require('../utils/token.utils');
router.get('/', viewsController.homePage).get('/:id', viewsController.homePage);

router.get('/update-course/:userId/:courseId', viewsController.editCourse);
router.get('/course-details/:userId/:courseId', viewsController.courseDetails);
router.get('/create-course/:id', viewsController.createCourse);

router.get('/logout/:id', viewsController.logOut);
router.get('/login-user', viewsController.login);
router.get('/signup-user', viewsController.signUp);
module.exports = router;
