const readFyleSync = require('fs').readFileSync;

module.exports = () => {
    return readFyleSync('./credentials.txt', 'utf-8')
        .split('\n')
        .map((line) => {
            return line.trim();
        });
};
