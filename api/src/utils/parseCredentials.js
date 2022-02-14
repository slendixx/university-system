const readFyleSync = require('fs').readFileSync;

module.exports = (source) => {
    return readFyleSync(source, 'utf-8')
        .split('\n')
        .map((line) => {
            return line.trim();
        });
};
