const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const user = require('../model/user');

module.exports.create = catchAsync(async (req, res, next) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        birthYear: req.body.birthYear,
        birthMonth: req.body.birthMonth,
        birthDay: req.body.birthDay,
    };

    const result = await user.insert(userData);

    if (!result.ok) return next(new AppError(result.message, 400));

    res.status(200).json({
        ok: true,
        data: {
            status: result.message,
        },
    });
});
