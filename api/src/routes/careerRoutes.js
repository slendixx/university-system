const express = require('express');
const controller = require('../controllers/careerController');
const passport = require('passport');
const { restrictTo } = require('../controllers/authController');

const router = express.Router();

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

router
    .route('/:id')
    .get(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente', 'alumno']),
        controller.getById
    )
    .patch(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin'])
    )
    .delete(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin'])
    );

module.exports = router;
