const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const student = require('../model/student');

module.exports.getAll = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const getGrades = req.query.grades !== undefined;

    const result = await student.select({ userId, getGrades });
    if (!result.ok) return next(new AppError(result.message, 400));

    res.status(200).json({
        ok: true,
        data: {
            results: result.rows,
        },
    });
});
