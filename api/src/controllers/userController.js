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
        career: req.body.career,
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

module.exports.getAll = catchAsync(async (req, res, next) => {
    const result = await user.select();

    if (result.length === 0)
        return next(new AppError('No results found.', 404));

    res.status(200).json({
        ok: true,
        data: {
            results: result.rows,
        },
    });
});

module.exports.getById = catchAsync(async (req, res, next) => {
    const id = Number(req.params.userId);
    const result = await user.select({ id });

    if (result.length === 0)
        return next(new AppError('No results found for the given id.', 404));

    res.status(200).json({
        ok: true,
        data: {
            results: result.rows,
        },
    });
});
