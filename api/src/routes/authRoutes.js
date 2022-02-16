const express = require('express');
const passport = require('passport');
const controller = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post();
router
    .route('/login')
    .post(
        passport.authenticate('local', { session: false }),
        controller.signJwt
    );

module.exports = router;
