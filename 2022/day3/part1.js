const toInt = chr => chr.charCodeAt(0) - ((chr >= 'a' && chr <= 'z') ? 96 : 38);
const solution = input => input
  .split(/\n/)
  .map(line => {
    const firstSet = new Set(line.substring(0, line.length /2).split(""));
    const secondSet = new Set(line.substring(line.length /2, line.length).split(""));
    for (const ch of firstSet) {
      if (secondSet.has(ch)) {
        return ch;
      }
    }
  })
  .map(toInt)
  .sum();

module.exports = solution;
