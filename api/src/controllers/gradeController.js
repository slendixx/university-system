const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const grade = require('../model/grade');

module.exports.getAll = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const result = await grade.select({ userId });
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
    const { newValues } = req.body;
    const result = await grade.insert({ data: newValues });

    if (!result.ok) return next(result.message, 400);

    res.status(201).json({
        ok: true,
        data: {
            results: result,
        },
    });
});

module.exports.update = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const { updatedValues } = req.body;
    const result = await grade.update({ data: updatedValues });

    if (!result.ok) return next(result.message, 400);

    res.status(200).json({
        ok: true,
        data: {
            results: result,
        },
    });
});
