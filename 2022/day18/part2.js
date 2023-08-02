const getAdjacents = ([x,y,z]) => [
  [x+1, y, z],
  [x-1, y, z],
  [x, y+1, z],
  [x, y-1, z],
  [x, y, z+1],
  [x, y, z-1]
];

const calculateVolume = cubes => {
  const t = cubes.reduce((acc, v) => ({
    xs: [...acc.xs, v[0]],
    ys: [...acc.ys, v[1]],
    zs: [...acc.zs, v[2]],
  }), { xs: [], ys: [], zs: []});
  return (max(...t.xs) - min(...t.xs))*(max(...t.ys) - min(...t.ys))*(max(...t.zs) - min(...t.zs));
}

export const solution = input => {
  const lines = input.split(/\n/)
  const cubeSet = new Set();
  const cubes = lines.map(l => { cubeSet.add(l); return l.split(',').map(int); });
  const MAX = calculateVolume(cubes);

  const outside = new Set();
  const inside = new Set();

  const expandable = (start) => {
    if (outside.hasArr(start)) return true;
    if (inside.hasArr(start)) return false;
    const visited = new Set();
    const queue = [];
    queue.push(start)
    while (queue.length > 0) {
      const cube = queue.shift();
      if (cubeSet.hasArr(cube) || visited.hasArr(cube)) {
        continue;
      }
      visited.addArr(cube);
      if (visited.size > MAX) {
        visited.forEach(c => outside.addArr(c));
        return true;
      }
      getAdjacents(cube).forEach(adj => {
        if (!visited.hasArr(adj)) { queue.push(adj); }
      })
    }
    visited.forEach(c => inside.addArr(c));
    return false;
  };

  let sum = 0;
  cubes.forEach(cube => {
    getAdjacents(cube).forEach(adj => {
      if (expandable(adj)) sum++;
    })
  });
  return sum;
}

