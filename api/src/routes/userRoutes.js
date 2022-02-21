const express = require('express');
const controller = require('../controllers/userController');
const passport = require('passport');
const { restrictTo } = require('../controllers/authController');
const courseRouter = require('./courseRoutes');

const router = express.Router();

router.use(
    '/:userId/courses',
    (req, res, next) => {
        req.body.getCoursesFor = 'user';
        next();
    },
    courseRouter
);

router
    .route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin']),
        controller.getAll
    )
    .post(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin']),
        controller.create
    );

router
    .route('/:userId')
    .get(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente', 'alumno']),
        controller.getById
    )
    .patch(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin', 'docente', 'alumno'])
    )
    .delete(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin'])
    );

module.exports = router;
