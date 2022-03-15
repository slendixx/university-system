const express = require('express');
const controller = require('../controllers/activityController');
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
        restrictTo(['admin', 'docente']),
        controller.create
    );

router
    .route('/:activityId')
    .get(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente', 'alumno']),
        controller.getById
    )
    .patch(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente']),
        controller.update
    )
    .delete(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente'])
    );

module.exports = router;
