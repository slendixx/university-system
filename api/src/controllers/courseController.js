const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const career = require('../model/career');

module.exports.getAll = catchAsync(async (req, res, next) => {
    const careerId = req.params.careerId;
    const result = await career.select(careerId, true);

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
    const careerId = req.params.careerId;
    const courseId = Number(req.params.courseId);
    const result = await career.select(careerId, true);

    if (result.rows.length === 0)
        return next(new AppError(result.message, 404));

    const selectedCourse = result.rows[0].courses.find((course) => {
        console.log(course);
        return course['id asignatura'] === courseId;
    });

    if (!selectedCourse)
        return next(new AppError('No course found for the given id', 404));

    if (selectedCourse)
        res.status(200).json({
            ok: true,
            data: {
                results: selectedCourse,
            },
        });
});
