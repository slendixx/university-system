const express = require('express');
const controller = require('../controllers/apiKeyController');
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

router
    .route('/:id')
    .get(
        passport.authenticate('jwt', { session: false }),
        restrictTo(['admin']),
        controller.getById
    );

module.exports = router;
