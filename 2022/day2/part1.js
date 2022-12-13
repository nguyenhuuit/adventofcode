const shapePoints = {
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
};

const resultPoints = {
  LOSE: 0,
  DRAW: 3,
  WON: 6,
};

const m = {
  A: {
    X: resultPoints.DRAW + shapePoints.X, // rock
    Y: resultPoints.WON + shapePoints.Y, // paper
    Z: resultPoints.LOSE + shapePoints.Z, // scissors
  },
  B: {
    X: resultPoints.LOSE + shapePoints.X,
    Y: resultPoints.DRAW + shapePoints.Y,
    Z: resultPoints.WON + shapePoints.Z,
  },
  C: {
    X: resultPoints.WON + shapePoints.X,
    Y: resultPoints.LOSE + shapePoints.Y,
    Z: resultPoints.DRAW + shapePoints.Z,
  },
};
const solution = (input) => {
  return input
    .split(/\n/)
    .map((p) => m[p.charAt(0)][p.charAt(2)])
    .sum();
};

module.exports = solution;
