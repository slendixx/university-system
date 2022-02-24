const readFileSync = require("fs").readFileSync;
const writeFileSync = require("fs").writeFileSync;

const driveImageExportUrl = "https://drive.google.com/uc?export=view&id=";

//input is a list of drive file ids
const input = readFileSync("input.txt", "utf-8").split("\n");
const output = input
  .map((line) => {
    return driveImageExportUrl + line;
  })
  .join("\n");

writeFileSync("output.txt", output, "utf-8");
