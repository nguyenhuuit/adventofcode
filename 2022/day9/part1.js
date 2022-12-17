const solution = (input) => {
  const H = { x: 0, y: 0 };
  const T = { x: 0, y: 0 };

  const trace = new Set();
  trace.add("0,0");

  const moveH = (direction) => {
    const oldHX = H.x;
    const oldHY = H.y;
    switch (direction) {
      case "R": H.x++; break;
      case "L": H.x--; break;
      case "U": H.y++; break;
      case "D": H.y--; break;
      default:
    }
    if (abs(H.x - T.x) === 2 || abs(H.y - T.y) === 2) {
      T.x = oldHX;
      T.y = oldHY;
      trace.add(`${T.x},${T.y}`);
    }
  };

  const lines = input.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const [, direction, steps] = lines[i].match(/^([LRDU]) ([0-9]+)$/);
    const numSteps = int(steps);
    for (let j = 0; j < numSteps; j++) {
      moveH(direction);
    }
  }
  return trace.size;
};

module.exports = solution;
