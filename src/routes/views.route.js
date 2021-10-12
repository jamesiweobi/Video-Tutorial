const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller');

router.get('/', viewsController.homePage);
router.get('/login-user', viewsController.login);
router.get('/signup-user', viewsController.signUp);

module.exports = router;
