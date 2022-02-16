const { reject } = require('bcrypt/promises');
const { resolve } = require('path');

const readFile = require('fs').readFile;

module.exports = (source) => {
    return new Promise((resolve, reject) => {
        readFile(source, 'utf-8', (error, data) => {
            if (error) reject(error);
            resolve(data);
        });
    });
};
