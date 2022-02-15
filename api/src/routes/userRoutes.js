const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

router.route('/').get(controller.getAll).post(controller.create);

router.route('/:id').get(controller.getById);

router.route('/login').post();

module.exports = router;
