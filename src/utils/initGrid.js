function generateLine(size) {
  const maxBombs = parseInt((size * 30) / 100, 10);
  let countBombs = 0;
  let line = [];

  for (let index = 0; index < size; index++) {
    const bomb = countBombs <= maxBombs ? Math.floor(Math.random() * 2) : 0;
    bomb === 1 && (countBombs += 1);
    line.push({ bomb, active: 0 });
  }

  return line;
}

export function initGrid(size) {
  let matrix = [];

  for (let index = 0; index < size; index++) {
    matrix.push(generateLine(size));
  }

  console.log("matrix", matrix);
  return matrix;
}
