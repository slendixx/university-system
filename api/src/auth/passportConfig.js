const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const testPassword = require('bcrypt').compare;
const user = require('../model/user');
const parseJwtSecret = require('../utils/parseJwtSecret');

passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            const result = await user.findOne(email);

            if (!result.ok) return done(result.message);

            if (result.rows.length === 0)
                return done(null, false, {
                    message: 'Invalid email of password',
                });

            const [userData] = result.rows;

            const isValidPassword = await testPassword(
                password,
                userData.password
            );

            if (!isValidPassword)
                return done(null, false, {
                    message: 'Invalid email or password',
                });

            return done(null, userData, { message: 'Login successful' });
        }
    )
);

passport.use(
    new JwtStrategy(
        {
            //secretOrKey: parseJwtSecret(__dirname + '/../../jwt-secret.txt'),
            secretOrKey: parseJwtSecret('jwt-secret.txt'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (payload, done) => {
            const { id: userId } = payload;
            const result = await user.select(userId);
            if (!result.ok) return done(result.message);

            if (result.rows.length === 0)
                return done(null, false, { message: 'Invalid token' });
            const [userData] = result.rows;
            return done(null, userData);
        }
    )
);
