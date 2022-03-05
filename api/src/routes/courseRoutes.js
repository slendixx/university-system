const express = require('express');
const controller = require('../controllers/courseController');
const passport = require('passport');
const { restrictTo } = require('../controllers/authController');
const activityRouter = require('./activityRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:courseId/activities', activityRouter);

router
    .route('/')
    .get(controller.getAll)
    .post(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin'])
    );

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
