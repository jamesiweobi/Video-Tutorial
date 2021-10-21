const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

router
    .post('/', courseController.createCourse)
    .get('/', courseController.findAllCourse)
    .delete('/:id', courseController.deleteCourse)
    .put('/enroll/:id', courseController.enrollCourse);
router
    .get('/:id', courseController.findCourse)
    .put('/:id', courseController.updateCourse);

module.exports = router;
