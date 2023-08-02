export const solution = (input) => {
  return input
    .split(/\n\n/)
    .map(p => p.split(/\n/).map(int).sum())
    .sort((a, b) => b - a)
    .slice(0,3)
    .sum();
};
