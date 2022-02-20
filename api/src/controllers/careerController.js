const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const career = require('../model/career');

module.exports.getAll = catchAsync(async (req, res, next) => {
    const result = await career.select(null, false);

    if (result.rows.length === 0)
        return next(new AppError(result.message, 404));

    res.status(200).json({
        ok: true,
        data: {
            results: result.rows,
        },
    });
});

module.exports.getById = catchAsync(async (req, res, next) => {
    const id = req.params.careerId;

    const result = await career.select(id, false);

    if (result.rows.length === 0)
        return next(new AppError(result.message, 404)); //TODO add proper messages for this error cases

    res.status(200).json({
        ok: true,
        data: {
            results: result.rows,
        },
    });
});
