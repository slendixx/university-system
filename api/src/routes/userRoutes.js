const express = require('express');
const controller = require('../controllers/userController');
const passport = require('passport');
const { restrictTo } = require('../controllers/authController');

const router = express.Router();

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

router.route('/:id').get(controller.getById);

module.exports = router;
