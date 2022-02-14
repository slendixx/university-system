const express = require('express');
const controller = require('../controllers/apiKeyController');
const authenticateApikey = require('../auth/apikeys').authenticate;

const router = express.Router();

router.route('/').get(controller.getAll).post(controller.create);

router.route('/:id').get(controller.getById);

module.exports = router;
