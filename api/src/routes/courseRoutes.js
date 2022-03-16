const express = require('express');
const controller = require('../controllers/courseController');
const passport = require('passport');
const { restrictTo } = require('../controllers/authController');
const activityRouter = require('./activityRoutes');
const studentRouter = require('./studentRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:courseId/activities', activityRouter);
router.use('/students', studentRouter);

router
    .route('/')
    .get(controller.getAll)
    .post(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente', 'alumno']),
        controller.add
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
        restrictTo(['admin'])
    )
    .delete(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente', 'alumno']),
        controller.delete
    );

module.exports = router;
