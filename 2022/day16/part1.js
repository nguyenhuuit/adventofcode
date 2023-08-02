export const solution = input => {
  const valves = input
    .split(/\n/)
    .map(l => {
      const matches = l.match(/Valve ([A-Z]+) .* rate=([0-9]+);.* valves? ([A-Z ,]+)/);
      return {
        name: matches[1],
        rate: int(matches[2]),
        next: matches[3].split(/[, ]+/)
      }
    })
    .reduce((acc, v) => ({ ...acc, [v.name]: v }), {});

  const cache = {};

  const DFS = (valve, marks, time) => {
    if (time === 0) {
      return 0;
    }
    if (cache[`${valve}.${time}.${marks.sort().join("")}`] !== undefined) {
      return cache[`${valve}.${time}.${marks.sort().join("")}`];
    }

    let rs = 0;
    if (!marks.includes(valve)) {
      const flow = (time - 1) * valves[valve].rate;
      for (let i = 0; i < valves[valve].next.length; i++) {
        if (flow > 0) {
          rs = max(rs, flow + DFS(valves[valve].next[i], [...marks, valve], time - 2));
        }
        rs = max(rs, DFS(valves[valve].next[i], [...marks], time - 1));
      }
    }
    cache[`${valve}.${time}.${marks.sort().join("")}`] = rs;
    return rs;
  }
  
  return DFS('AA', [], 30);
}

