const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const student = require('../model/grade');

module.exports.getAll = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const result = await student.select({ userId });
    if (!result.ok) return next(new AppError(result.message, 400));
    if (result.rows.length === 0)
        return next(new AppError('No student grades found'), 404);

    res.status(200).json({
        ok: true,
        data: {
            results: result.rows,
        },
    });
});

module.exports.create = catchAsync(async (req, res, next) => {
    console.log(req.body);
});

module.exports.update = catchAsync(async (req, res, next) => {
    console.log(req.body);
});
