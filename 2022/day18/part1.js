const getAdjacents = ([x,y,z]) => [
  [x+1, y, z],
  [x-1, y, z],
  [x, y+1, z],
  [x, y-1, z],
  [x, y, z+1],
  [x, y, z-1]
];

export const solution = input => {
  const lines = input.split(/\n/)
  const cubeSet = new Set();
  const cubes = lines.map(l => { cubeSet.add(l); return l.split(',').map(int); });
  let sum = 0;
  cubes.forEach(cube => {
    getAdjacents(cube).forEach(adj => {
      if (!cubeSet.hasArr(adj)) sum++;
    })
  });
  return sum;
}

