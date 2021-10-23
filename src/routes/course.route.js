const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

router
    .post('/', courseController.createCourse)
    .get('/', courseController.findAllCourse)
    .delete('/:id', courseController.deleteCourse)
    .put('/enroll', courseController.enrollCourse);
router
    .get('/:userId', courseController.findCourse)
    .put('/:id', courseController.updateCourse);

module.exports = router;
