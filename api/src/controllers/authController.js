const jwt = require('jsonwebtoken');
const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');

module.exports.signJwt = catchAsync(async (req, res, next) => {
    try {
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
        return res.status(200).json({
            ok: true,
            data: {
                token: token,
                userId: req.user.id,
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
