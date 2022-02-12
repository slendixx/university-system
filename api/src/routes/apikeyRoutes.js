const express = require('express');
const controller = require('../controllers/apiKeyController');

const router = express.Router();

router.route('/').get().post(controller.createApikey);

router.route('/:id').get().patch().delete();

module.exports = router;
