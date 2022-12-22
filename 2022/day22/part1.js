const parseWorld = w => {
  const lines = w.split(/\n/).map(l => l.split(""));
  const maxLength = max(...lines.map(l => l.length))
  const world = [];
  for (let i = 0; i < lines.length; i++) {
    const row = new Array(maxLength).fill(" ");
    for (let j = 0; j < lines[i].length; j++) {
      row[j] = lines[i][j]
    }
    world.push(row);
  }
  return world;
}
const parseGuide = g => {
  return g.split("").reduce((acc, c, idx) => {
    if (c === 'R' || c === 'L' || idx === 0 || acc.last() === 'R' || acc.last() === 'L') {
      acc.push(c);
    } else {
      acc[acc.length - 1] += c
    }
    return acc;
  },[])
}

const steps = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1]
]

const move = (g, world, pos) => {
  if (g === 'R') {
    pos.d = (pos.d + 1) % 4
  } else if (g === 'L') {
    pos.d = (pos.d + 3) % 4
  } else {
    const [dx, dy] = steps[pos.d];
    let i = 0;
    while (i < int(g)) {
      let newX = (pos.x + dx + world[0].length) % world[0].length;
      let newY = (pos.y + dy + world.length) % world.length;
      while (world[newY][newX] === ' ') {
        newX = (newX + dx + world[0].length) % world[0].length;
        newY = (newY + dy + world.length) % world.length;
      }
      if (world[newY][newX] === '.') {
        pos.x = newX;
        pos.y = newY;
      } else {
        break;
      }
      i++;
    }
  }
}
const solution = input => {
  const [w, g] = input.split(/\n\n/);
  const world = parseWorld(w);
  const guide = parseGuide(g);
  const pos = {
    x: 8,
    y: 0,
    d: 0
  };
  for (let i = 0; i < guide.length; i++) {
    move(guide[i], world, pos);
  }
  return 1000*(pos.y+1) + 4*(pos.x + 1) + pos.d;
}

module.exports = solution;
