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
        birthDate: req.body.birthDate,
    };

    await user.insert();

    res.status(200).json({
        ok: true,
        data: {},
    });
});
