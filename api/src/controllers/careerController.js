const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const career = require('../model/career');

module.exports.getAll = catchAsync(async (req, res, next) => {
    const getCourses = req.query.courses === 'true' ? true : false;

    const result = await career.select(null, getCourses);

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
    const getCourses = req.query.courses === 'true' ? true : false;
    const id = req.params.id;

    const result = await career.select(id, getCourses);

    if (result.rows.length === 0)
        return next(new AppError(result.message, 404));

    res.status(200).json({
        ok: true,
        data: {
            results: result.rows,
        },
    });
});
