const shapePoints = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
};

const resultPoints = {
  X: 0, // lose
  Y: 3, // draw
  Z: 6, // win
};

const m = {
  A: {
    X: resultPoints.X + shapePoints.C,
    Y: resultPoints.Y + shapePoints.A,
    Z: resultPoints.Z + shapePoints.B,
  },
  B: {
    X: resultPoints.X + shapePoints.A,
    Y: resultPoints.Y + shapePoints.B,
    Z: resultPoints.Z + shapePoints.C,
  },
  C: {
    X: resultPoints.X + shapePoints.B,
    Y: resultPoints.Y + shapePoints.C,
    Z: resultPoints.Z + shapePoints.A,
  },
};
const solution = (input) => {
  return input
    .split(/\n/)
    .map((p) => m[p.charAt(0)][p.charAt(2)])
    .sum();
};

module.exports = solution;
