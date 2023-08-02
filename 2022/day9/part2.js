export const solution = (input) => {
  const robeLength = 10;
  const T = [];
  for (let i = 0; i < robeLength; i++) {
    T.push({ x: 0, y: 0 });
  }

  const trace = new Set();
  trace.add("0,0");

  const moveH = (direction) => {
    switch (direction) {
      case "R": T[0].x++; break;
      case "L": T[0].x--; break;
      case "U": T[0].y++; break;
      case "D": T[0].y--; break;
      default:
    }
    for (let i = 1; i < robeLength; i++) {
      const current = T[i];
      const prev = T[i - 1];
      if (Math.abs(current.x - prev.x) === 2) {
        current.x = (current.x + prev.x) / 2;
        current.y =
          Math.abs(current.y - prev.y) === 2
            ? (current.y + prev.y) / 2
            : prev.y;
      } else if (Math.abs(current.y - prev.y) === 2) {
        current.y = (current.y + prev.y) / 2;
        current.x =
          Math.abs(current.x - prev.x) === 2
            ? (current.x + prev.x) / 2
            : prev.x;
      } else {
        break;
      }
    }
    const pos = `${T[robeLength - 1].x},${T[robeLength - 1].y}`;
    if (!trace.has(pos)) {
      trace.add(pos);
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

