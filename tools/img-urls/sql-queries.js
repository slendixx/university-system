const readFileSync = require("fs").readFileSync;
const writeFileSync = require("fs").writeFileSync;

const sql = `UPDATE carrera 
SET imagen_lg = "{lg}",
imagen_sm = "{sm}"
WHERE id = {id};
`;

const input = readFileSync("output.txt", "utf-8").split("\n");
const urlPairs = [];

for (let i = 0; i < input.length; i += 2) {
  const aux = [];
  aux.push(input[i]);
  aux.push(input[i + 1]);
  urlPairs.push(aux);
}

const output = urlPairs
  .map((urlPair, index) => {
    const [urlLg, urlSm] = urlPair;
    return sql
      .replace("{lg}", urlLg)
      .replace("{sm}", urlSm)
      .replace("{id}", index + 1);
  })
  .join("\n");

writeFileSync("output.sql", output, "utf-8");
