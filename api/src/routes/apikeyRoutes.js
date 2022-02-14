const express = require('express');
const controller = require('../controllers/apiKeyController');

const router = express.Router();

router.route('/').get(controller.getAll).post(controller.create);

router.route('/:id').get(controller.getById).patch().delete();

module.exports = router;
