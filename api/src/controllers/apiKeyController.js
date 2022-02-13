const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/appError');
const Apikey = require('../auth/apikeys');

module.exports.createApikey = catchAsync(async (req, res, next) => {
    const host = req.headers.host;
    const alias = req.body.alias || 'NULL';

    console.log('host: ' + host, 'alias: ' + alias);

    Apikey.create({ host, alias })
        .then()
        .catch(() => {
            console.log('caught the fuc#&%* error');
        });

    res.status(200).json({
        ok: true,
        data: {
            message: 'API key successfully created.',
        },
    });
});
