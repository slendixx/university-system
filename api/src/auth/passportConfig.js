const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy } = require('passport-jwt');
const user = require('../model/user');

passport.use(new LocalStrategy(async (email, password, done) => {}));
