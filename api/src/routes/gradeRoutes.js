const express = require('express');
const controller = require('../controllers/gradeController');
const passport = require('passport');
const { restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente']),
        controller.getAll
    )
    .post(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente']),
        controller.create
    );

module.exports = router;
