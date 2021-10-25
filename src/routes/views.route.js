const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller');
const { authToken } = require('../utils/token.utils');

router.get(
    '/update-course/:userId/:courseId',
    authToken,
    viewsController.editCourse
);
router.get(
    '/course-details/:userId/:courseId',
    authToken,
    viewsController.courseDetails
);
router.get('/create-course/:id', authToken, viewsController.createCourse);

router.get('/logout/:id', viewsController.logOut);
router.get('/login-user', viewsController.login);
router.get('/signup-user', viewsController.signUp);
router
    .get('/', viewsController.homePage)
    .get('/:id', authToken, viewsController.homePage);

router.use('*', (req, res) => {
    return res.render('404', {
        layout: 'layout',
    });
});
module.exports = router;
