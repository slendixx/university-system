const express = require('express');
const passport = require('passport');
const controller = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(userController.create);
router
    .route('/login')
    .post(
        passport.authenticate('local', { session: false }),
        controller.signJwt
    );

module.exports = router;

// Here I could create a route for modifying users' authorization
