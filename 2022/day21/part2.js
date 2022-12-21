const solve = (equation, found) => {
  const [lhs,rhs] = equation;
  const [x,oper,y] = lhs;
  if (isArray(x)) {
    switch (oper) {
      case '+': return solve([x,rhs-y], found);
      case '-': return solve([x,rhs+y], found);
      case '*': return solve([x,rhs/y], found);
      case '/': return solve([x,rhs*y], found);
    }
  }
  if (isArray(y)) {
    switch (oper) {
      case '+': return solve([y,rhs-x], found);
      case '-': return solve([y,x-rhs], found);
      case '*': return solve([y,rhs/x], found);
      case '/': return solve([y,x/rhs], found);
    }
  }
  found.value = equation[1];
}

const solution = input => {
  const monkeys = input
    .split(/\n/)
    .map(line => line.split(': '))
    .reduce((acc,line) => {
      if (line[0] === 'humn') {
        acc[0][line[0]] = ['x'];
        return acc; 
      }
      const v = line[1].split(' ');
      if (v.length === 1) {
        acc[0][line[0]] = int(v[0]);
      } else {
        acc[1][line[0]] = v;
        if (line[0] === 'root') {
          acc[1][line[0]][1] = '='
        }
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
        if (!isArray(known[first]) && !isArray(known[second])) {
          known[key] = eval(`${known[first]}${oper}${known[second]}`);
        } else {
          known[key] = [known[first], oper, known[second]];
        }
        delete unknown[key];
        break;
      }
    }
  }
  const found = {};
  solve([known.root[0], known.root[2]], found);
  return found.value;
}

module.exports = solution
