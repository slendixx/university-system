const jwt = require('jsonwebtoken');
const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const parseJwtSecret = require('../utils/parseJwtSecret');

module.exports.signJwt = catchAsync(async (req, res, next) => {
    try {
        const token = jwt.sign(
            { id: req.user.id },
            'IF THE WORD HATE WAS ENGRAVED ON EACH NANOANGSTROM'
        );
        return res.status(200).json({
            ok: true,
            data: {
                token: token,
            },
        });
    } catch (error) {
        return next(new AppError(error));
    }
});

module.exports.restrictTo = (authorizedRoles) => (req, res, next) => {
    if (!authorizedRoles.includes(req.user.role))
        return next(
            new AppError(
                'The user is not authorized to access this resource',
                403
            )
        );
    next();
};
