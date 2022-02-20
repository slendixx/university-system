const express = require('express');
const controller = require('../controllers/courseController');
const passport = require('passport');
const { restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente', 'alumno']),
        controller.getAll
    )
    .post(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin'])
    );
//TODO implement 'guest' routes AKA routes that don't require a JWT

router
    .route('/:courseId')
    .get(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente', 'alumno']),
        controller.getById
    )
    .patch(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente'])
    )
    .delete(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin'])
    );

module.exports = router;
