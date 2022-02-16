const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const testPassword = require('bcrypt').compare;
const user = require('../model/user');

passport.use(
    new LocalStrategy(async (email, password, done) => {
        const result = await user.findOne(email);
        if (!result.ok) return done(result.message);

        if (result.length === 0)
            return done(null, false, { message: 'Invalid email of password' });

        const [userData] = result;

        const isValidPassword = await testPassword(password, userData.password);

        if (!isValidPassword)
            return done(null, false, { message: 'Invalid email or password' });

        return done(null, userData, { message: 'Login successful' });
    })
);

passport.use(
    new JwtStrategy(
        {
            secretOrKey: process.env.AUTH_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (payload, done) => {
            const { id: userId } = payload;
            const result = await user.select(userId);
            if (!result.ok) return done(result.message);
            if (result.rows.length === 0)
                return done(null, false, { message: 'Invalid token' });
            return done(null, user);
        }
    )
);
