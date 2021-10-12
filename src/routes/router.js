const express = require('express');
const router = express.Router();
const authRouter = require('../routes/auth.route');
const courseRouter = require('../routes/course.route');
const ViewsRouter = require('../routes/views.route');

router.use('/api/v1/users', authRouter);
router.use('/api/v1/courses', courseRouter);
router.use('/', ViewsRouter);

module.exports = router;
