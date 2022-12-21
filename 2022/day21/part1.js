const solution = input => {
  const monkeys = input
    .split(/\n/)
    .map(line => line.split(': '))
    .reduce((acc,line) => {
      const v = line[1].split(' ');
      if (v.length === 1) {
        acc[0][line[0]] = int(v[0]);
      } else {
        acc[1][line[0]] = v;
      }
      return acc;
    }, [{}, {}]);
  const [known, unknown] = monkeys;
  while (!known.root) {
    const unknownKeys = Object.keys(unknown);
    for (let i = 0; i < unknownKeys.length; i++) {
      const key = unknownKeys[i];
      const [first, oper, second] = unknown[key];
      if (known[first] && known[second]) {
        known[key] = eval(`${known[first]}${oper}${known[second]}`);
        delete unknown[key];
        break;
      }
    }
  }
  return known.root;
}

module.exports = solution
