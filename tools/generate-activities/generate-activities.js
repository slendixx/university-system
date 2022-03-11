const fs = require("fs");

const ids = [
  273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287,
  288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302,
  303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317,
  318, 319, 320, 321, 322, 323, 324, 325, 327, 329, 330, 331, 334, 335, 336,
  342, 343, 344, 350, 351, 352, 357, 358, 359, 368, 369, 370, 375, 376, 377,
  382, 383, 384, 390, 391, 392, 397, 398, 399, 400, 401, 402, 403, 404, 405,
  406, 407, 408, 409, 410, 411, 412, 413, 414, 420, 421, 422, 423, 424, 425,
  426, 427, 428, 429, 430, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458,
  459, 460, 496, 498, 499, 500, 501, 502, 514, 515, 516, 517, 518, 519, 531,
  532, 533, 534, 535, 536,
];
const contenido = fs.readFileSync("./input.txt", "utf-8").split("\n");

let output1 =
  "INSERT INTO actividad (id_asignatura, titulo, contenido, fecha_publicacion) VALUES " +
  ids
    .map((id, index) => {
      return `${
        index === 0 ? "" : ","
      }(${id}, "primera actividad", "${contenido}", '2022-02-10 20:16:06')\n`;
    })
    .join("\n") +
  ";";

let output2 =
  "INSERT INTO actividad (id_asignatura, titulo, contenido, fecha_publicacion, fecha_limite, calificacion_maxima) VALUES " +
  ids
    .map((id, index) => {
      return `${
        index === 0 ? "" : ","
      }(${id}, "trabajo con calificacion 1", "${contenido}", '2022-02-10 20:16:06', '2022-03-10 20:16:06', 10.0)\n`;
    })
    .join("\n") +
  ";";

fs.writeFileSync("output1.sql", output1);
fs.writeFileSync("output2.sql", output2);
