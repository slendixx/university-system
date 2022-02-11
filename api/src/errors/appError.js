class AppError extends Error {
    constructor(message, statusCode, name) {
        super(message);
        this.statusCode = statusCode;
        this.status = this.initStatus(statusCode);
        this.isOperational = true;
        this.name = name || null;
    }

    initStatus(statusCode) {
        const statusCodeStr = String(statusCode);
        if (statusCodeStr.startsWith('4')) return 'client error';
        if (statusCodeStr.startsWith('5')) return 'server error';
        return 'error';
    }
}

module.exports = AppError;
