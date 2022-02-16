const readFileSync = require('fs').readFileSync;

module.exports = (source) => {
    return readFileSync(source, 'utf-8');
};
