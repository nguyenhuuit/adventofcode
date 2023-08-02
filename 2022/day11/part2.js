const parseMonkey = (inp) => {
  const monkey = { inspects: 0 };
  const lines = inp.split(/\n/);

  const m1 = lines[1].match(/^.*: ([0-9, ]+)$/);
  monkey.items = m1[1]
    .split(/[ ,]/)
    .filter((p) => !!p)
    .map(int);

  const m2 = lines[2].match(/^.* new = (.*)$/);
  monkey.rule = m2[1];

  const m3 = lines[3].match(/^.* by (.*)$/);
  monkey.test = int(m3[1]);

  const m4 = lines[4].match(/^.* monkey (.*)$/);
  monkey.iftrue = int(m4[1]);

  const m5 = lines[5].match(/^.* monkey (.*)$/);
  monkey.iffalse = int(m5[1]);
  return monkey;
};

export const solution = (input) => {
  const monkeys = input.split(/\n\n/).map(parseMonkey);

  const lcm = monkeys.map((m) => m.test).mul();

  for (let round = 0; round < 10000; round++) {
    for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
      const m = monkeys[monkeyIndex];
      while (m.items.length !== 0) {
        m.inspects++;
        const _old = m.items.splice(0, 1);
        let _new = eval(m.rule.replaceAll("old", _old));
        _new = _new % lcm;
        if (_new % m.test === 0) {
          monkeys[m.iftrue].items.push(_new);
        } else {
          monkeys[m.iffalse].items.push(_new);
        }
      }
    }
  }

  return Object.values(monkeys.map((m) => m.inspects))
    .sort((a, b) => b - a)
    .slice(0, 2)
    .mul();
};

