const middlePoints = (p1, p2) => {
  const rs = [];
  if (p1[0] === p2[0]) {
    const step = abs(p1[1] - p2[1]) / (p2[1] - p1[1]);
    let i = p1[1];
    while (i !== p2[1]) {
      rs.push([p1[0], i]);
      i += step;
    }
  } else {
    const step = abs(p1[0] - p2[0]) / (p2[0] - p1[0]);
    let i = p1[0];
    while (i !== p2[0]) {
      rs.push([i, p1[1]]);
      i += step;
    }
  }
  return rs;
}

const connect = listOfPoint => {
  let rs = [];
  for (let i = 0; i < listOfPoint.length - 1; i++) {
    const start = listOfPoint[i];
    const end = listOfPoint[i + 1];
    rs = [...rs, ...middlePoints(start, end)]
  }
  rs.push(listOfPoint.last());
  return rs;
}

const solutionUsingSet = input => {
  const lines = input.split(/\n/).map(line => line.split(/ -> /).map(l => l.split(',').map(int)));
  let maxY = 0;
  const rocks = lines
    .reduce((acc, v) => [...acc, ...connect(v)], [])
    .reduce((acc, v) => {
      if (v[1] > maxY) {
        maxY = v[1]
      }
      return acc.addArr(v);
    }, new Set());
  const rests = new Set();
  let y = 0;
  let x = 500;
  while (y < maxY) {
    if (!rocks.hasArr([x, y + 1]) && !rests.hasArr([x, y + 1])) {
      y++;
      continue;
    }
    if (!rocks.hasArr([x - 1, y + 1]) && !rests.hasArr([x - 1, y + 1])) {
      y++;
      x--;
      continue;
    }
    if (!rocks.hasArr([x + 1, y + 1]) && !rests.hasArr([x + 1, y + 1])) {
      y++;
      x++;
      continue;
    }
    rests.addArr([x, y]);
    y = 0;
    x = 500;
  }
  return rests.size;
}

const solutionUsingMatrix = input => {
  let maxY = 0;
  const lines = input
    .split(/\n/)
    .map(line => line.split(/ -> /).map(l => {
      const rs = l.split(',').map(int);
      if (rs[1] > maxY) { maxY = rs[1]};
      return rs;
    }));
  const board = [];
  for (let i = 0; i < 1000; i++) {
    const row = [];
    for (let j = 0; j < 1000; j++) {
      row.push('.');
    }
    board.push(row);
  }
  lines.forEach(line => {
    for (let i = 0;i < line.length - 1;i++) {
      const start = line[i];
      const end = line[i+1];
      if (start[0] === end[0]) {
        const step = abs(end[1] - start[1])/(end[1] - start[1]);
        for (let j = start[1]; j !== end[1]+step; j += step) {
          board[j][start[0]] = '#'
        }
      }
      if (start[1] === end[1]) {
        const step = abs(end[0] - start[0])/(end[0] - start[0]);
        for (let j = start[0]; j !== end[0]+step; j += step) {
          board[start[1]][j] = '#'
        }
      }
    }
  })
  let count = 0;
  let y = 0;
  let x = 500;
  while (y < maxY) {
    if (board[y+1][x] === '.') {
      y++;
      continue;
    }
    if (board[y+1][x-1] === '.') {
      y++;
      x--;
      continue;
    }
    if (board[y+1][x+1] === '.') {
      y++;
      x++;
      continue;
    }
    board[y][x] = 'O'
    count++;
    y = 0;
    x = 500;
  }
  return count;
}

module.exports = solutionUsingMatrix;
