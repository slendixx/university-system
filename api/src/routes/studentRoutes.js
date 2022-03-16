const express = require('express');
const controller = require('../controllers/studentController');
const passport = require('passport');
const { restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente']),
        controller.getAll
    );

module.exports = router;
