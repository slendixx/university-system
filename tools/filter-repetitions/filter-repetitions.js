const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const set = new Set(input);
const output = Array.from(set)
    .map((line) => {
        return line.trim();
    })
    .map((line) => {
        return '("' + line + '"),';
    })
    .join('\n');

fs.writeFileSync('output.txt', output);
