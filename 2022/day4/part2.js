const solution = input => {
  return input
    .split(/\n/)
    .map(p => p.split(/[-,]/).map(int))
    .filter(p => (
        (p[0] >= p[2] && p[0] <= p[3]) || 
        (p[1] >= p[2] && p[1] <= p[3]) ||
        (p[2] >= p[0] && p[2] <= p[1]) ||
        (p[3] >= p[0] && p[3] <= p[1])))
    .length
}

module.exports = solution;
