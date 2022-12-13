const solution = input => {
  return input
    .split(/\n\n/)
    .map(p => p.split(/\n/).map(int).sum())
    .sort((a, b) => b - a)
    .shift();
}

module.exports = solution;