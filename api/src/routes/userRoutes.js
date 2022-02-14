const express = require('express');
const authenticateApikey = require('../auth/apikeys').authenticate;
const controller = require('../controllers/userController');

const router = express.Router();

router.route('/').get().post(authenticateApikey, controller.create);

router.route('/:id').get().patch().delete();

module.exports = router;
