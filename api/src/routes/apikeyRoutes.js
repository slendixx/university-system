const express = require('express');
const controller = require('../controllers/apiKeyController');
const authenticateApikey = require('../auth/apikeys').authenticate;

const router = express.Router();

router
    .route('/')
    .get(authenticateApikey, controller.getAll)
    .post(authenticateApikey, controller.create);

router.route('/:id').get(authenticateApikey, controller.getById);

module.exports = router;
