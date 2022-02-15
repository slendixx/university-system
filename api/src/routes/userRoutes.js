const express = require('express');
const authenticateApikey = require('../auth/apikeys').authenticate;
const controller = require('../controllers/userController');

const router = express.Router();

router.route('/').get(controller.getAll).post(controller.create);

router.route('/:id').get(controller.getById).patch().delete();

module.exports = router;
