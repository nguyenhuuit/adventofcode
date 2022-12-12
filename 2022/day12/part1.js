const solution = (input) => {
  const nodes = input.split(/\n/).map((line) => line.split(""));
  let startX;
  let startY;
  let endX;
  let endY;

  const MAX = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes[i].length; j++) {
      const node = {
        depth: MAX,
        visited: false,
        value: nodes[i][j]
      }
      if (nodes[i][j] === "S") {
        startX = i;
        startY = j;
        node.value = "a";
      }
      if (nodes[i][j] === "E") {
        endX = i;
        endY = j;
        node.value = "z";
      }
      nodes[i][j] = node;
    }
  }

  const queue = [];
  nodes[startX][startY].depth = 0;
  nodes[startX][startY].visited = true;
  queue.push([startX, startY]);
  while (queue.length !== 0) {
    const [x, y] = queue.shift();
    const current = nodes[x][y];

    [[x+1,y], [x,y+1], [x-1,y], [x,y-1]].forEach(([xx, yy]) => {
      if (xx < 0 || yy < 0 || xx >= nodes.length || yy >= nodes[0].length) { return; }
      if (nodes[xx][yy].value.charCodeAt(0) - current.value.charCodeAt(0) <= 1) {
        nodes[xx][yy].depth = Math.min(nodes[x][y].depth + 1, nodes[xx][yy].depth);
        if (!nodes[xx][yy].visited) {
          queue.push([xx, yy]);
          nodes[xx][yy].visited = true;
        }
      }
    })
  }
  return nodes[endX][endY].depth;
};

module.exports = solution;
