const express = require('express');
const controller = require('../controllers/activityController');
const passport = require('passport');
const { restrictTo } = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente', 'alumno'])
    )
    .post(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente'])
    );

router
    .route('/:id')
    .get(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente', 'alumno'])
    )
    .patch(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente'])
    )
    .delete(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente'])
    );

module.exports = router;
