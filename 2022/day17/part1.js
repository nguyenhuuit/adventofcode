const ROCKS = `
####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##
` .trim()
  .split(/\n\n/)
  .map(bl => {
    const line = bl.split(/\n/);
    const cells = [];
    for (let i = 0;i<line.length;i++) {
      for (let j = 0;j<line[i].length;j++) {
        if (line[i].charAt(j) === '#') {
          cells.push([i,j])
        }
      }
    }
    return { cells, height: line.length };
  })

const addRockToChamber = (chamber, rockIndex) => {
  const rockTemplate = ROCKS[rockIndex];
  const lines = new Array(rockTemplate.height);
  for (let i = 0; i < rockTemplate.height; i++) {
    lines[i] = ['.','.','.','.','.','.','.'];
  }

  for (let i = 0; i < rockTemplate.cells.length;i++) {
    const [x, y] = rockTemplate.cells[i];
    lines[x][y+2] = '@';
  }

  const gap = new Array(3);
  for (let i = 0; i < 3; i++) {
    gap[i] = ['.','.','.','.','.','.','.'];
  }
  gap.forEach(l => chamber.unshift(l))
  lines.reverse().forEach(l => chamber.unshift(l));
}

const moveRock = (chamber, posX, posY, rockIndex, dx, dy) => {
  const cells = ROCKS[rockIndex].cells;
  let canMove = true;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i][1] + posY + dy < 0 ||
        cells[i][1] + posY + dy >= 7 ||
        cells[i][0] + posX + dx >= chamber.length ||
        chamber[cells[i][0] + posX + dx][cells[i][1] + posY + dy] === '#') {
          canMove = false;
      break;
    }
  }
  if (canMove) {
    for (let i = 0; i < cells.length; i++) {
      chamber[cells[i][0] + posX][cells[i][1] + posY] = '.'
    }
    for (let i = 0; i < cells.length; i++) {
      chamber[cells[i][0] + posX + dx][cells[i][1] + posY + dy] = '@'
    }
    return true;
  }
  return false;
}

const trimChamber = chamber => {
  const chamberLength = chamber.length;
  for (let i = 0;i < chamberLength;i++) {
    if (chamber[i].every(c => c === '#')) {
      chamber.splice(i);
      return chamberLength - i;
    }
  }
  return 0;
}

const cache = {};
addCache = (chamber, rockIndex, patternIndex, chamberLength, rockStopped) => {
  const key = `${rockIndex}:${patternIndex}:${chamber.slice(0,10).map(l => l.join("")).join("")}`;
  if (cache[key]) {
    return cache[key];
  } else {
    cache[key] = [chamberLength, rockStopped];
  }
}

const GOAL = 2022;

export const solution = input => {
  const jetPattern = input.split("");
  let patternIndex = 0;
  const chamber = []
  let rockIndex = 0;
  let rockStopped = 0;
  let cutted = 0;
  addRockToChamber(chamber, rockIndex)
  let posX = 0;
  let posY = 2;
  while (true) {
    const dy = jetPattern[patternIndex++ % jetPattern.length] === '>' ? 1 : -1;
    if (moveRock(chamber, posX, posY, rockIndex, 0, dy)) { posY += dy; }
    if (moveRock(chamber, posX, posY, rockIndex, 1, 0)) { posX++; }
    else {
      ROCKS[rockIndex].cells.forEach(([x, y]) => {
        chamber[x + posX][y + posY] = '#'
      })
      while (chamber[0].every(c => c === '.')) { chamber.shift(); }

      rockStopped++;

      const cached = addCache(chamber, rockIndex, patternIndex%jetPattern.length, chamber.length + cutted, rockStopped);
      if (cached) {
        const incrChamberLength = chamber.length + cutted - cached[0];
        const incrRock = rockStopped - cached[1];
        const times = Math.floor((GOAL - rockStopped) / incrRock);
        rockStopped += times * incrRock
        cutted += times * incrChamberLength
      }

      if (chamber.length > 500) { cutted += trimChamber(chamber); }
      if (rockStopped === GOAL) { return chamber.length + cutted; }

      rockIndex++;
      rockIndex = rockIndex % ROCKS.length;
      addRockToChamber(chamber, rockIndex);
      posX = 0;
      posY = 2;
    }
  }
}

