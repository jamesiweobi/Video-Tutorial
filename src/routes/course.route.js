const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

router
    .post('/', courseController.createCourse)
    .get('/', courseController.findAllCourse);
router
    .get('/:id', courseController.findCourse)
    .patch('/:id', courseController.updateCourse);

module.exports = router;
