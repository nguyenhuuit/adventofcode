const MAP = ['=', '-', '0', '1', '2'];

const solution = input => {
  const sum = input
    .split(/\n/)
    .map(line => line.split("").map(ch => MAP.indexOf(ch)).join(""))
    .map(n => parseInt(n,5) - parseInt(n.replaceAll(/./g, "2"), 5))
    .sum()
  const sumInBase5 = (sum + parseInt(sum.toString(5).replaceAll(/./g, "2"), 5))
    .toString(5)
    .split("")
    .map(ch => MAP[ch])
    .join("")
  return sumInBase5;
}

module.exports = solution;
