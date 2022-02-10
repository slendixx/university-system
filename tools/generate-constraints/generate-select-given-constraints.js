const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

let output = input
    .map((line) => {
        return line.trim();
    })
    .map((line, index) => {
        return `${index === 0 ? '' : 'OR '}nombre = "${line}"`;
    })
    .join('\n');

output = 'select * from asignatura where ' + output + ';';

fs.writeFileSync('output.txt', output);
