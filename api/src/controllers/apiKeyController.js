const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/appError');
const Apikeys = require('../auth/apikeys');

module.exports.create = catchAsync(async (req, res, next) => {
    const host = req.headers.host;
    const alias = req.body.alias || 'NULL';

    console.log('host: ' + host, 'alias: ' + alias);

    const results = await Apikeys.insert({ host, alias });
    if (!results.ok) {
        return next(new AppError(results.message, 500));
    }

    res.status(200).json({
        ok: true,
        data: {
            apikey: results.apikey,
        },
    });
});

module.exports.getAll = catchAsync(async (req, res, next) => {
    const results = await Apikeys.select();
    if (results.rows.length === 0) {
        return next(new AppError('No results found.', 404));
    }

    res.status(200).json({
        ok: true,
        data: {
            results: results.rows,
        },
    });
});

module.exports.getById = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const results = await Apikeys.select(id);
    if (results.rows.length === 0) {
        return next(new AppError('No results found for the given id.', 404));
    }

    res.status(200).json({
        ok: true,
        data: {
            results: results.rows,
        },
    });
});
