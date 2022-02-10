const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split("\n");

let output = input
  .map((line) => {
    return line.trim();
  })
  .map((line, index) => {
    return `${index === 0 ? "" : "OR "}nombre = "${line}"`;
  })
  .join("\n");

output = "select * from asignatura where " + output + ";";

fs.writeFileSync("output.txt", output);

const date = new Date();
const dateOutput = date.toISOString().slice(0, 19).replace("T", " ");
console.log(dateOutput);
