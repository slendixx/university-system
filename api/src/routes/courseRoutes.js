const express = require('express');
const controller = require('../controllers/courseController');

const router = express.Router();

router.route('/').get().post();

router.route('/:id').get().patch().delete();

module.exports = router;