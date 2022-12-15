const toInt = chr => chr.charCodeAt(0) - ((chr >= 'a' && chr <= 'z') ? 96 : 38);
const solution = input => input
  .split(/\n/)
  .reduce((acc, line, idx) => {
    const n = Math.floor(idx/3)
    if (n+1 > acc.length) {
      acc.push([])
    }
    acc[n].push(new Set(line.split("")));
    return acc;
  }, [])
  .map(group => {
    const [set1, set2, set3] = group;
    const commonSet = new Set();
    for (const ch of set1) {
      if (set2.has(ch)) {
        commonSet.add(ch);
      }
    }
    for (const ch of commonSet) {
      if (set3.has(ch)) {
        return ch;
      }
    }
  })
  .map(toInt)
  .sum();

module.exports = solution;
