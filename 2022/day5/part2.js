const solution = (input) => {
  const lines = input.split(/\n/);
  const queues = [];
  for (let i = 0; i < 9; i++) {
    queues.push([]);
  }
  let i = 0;
  while (lines[i] !== "") {
    for (let j = 0; j < (lines[i].length + 1) / 4; j++) {
      if (lines[i][j * 4 + 1] >= "A" && lines[i][j * 4 + 1] <= "Z") {
        queues[j].unshift(lines[i][j * 4 + 1]);
      }
    }
    i++;
  }
  i++;
  while (i < lines.length) {
    const matches = lines[i].match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/);
    const moves = int(matches[1]);
    const from = int(matches[2]);
    const to = int(matches[3]);

    const items = queues[from - 1].splice(queues[from - 1].length - moves);
    queues[to - 1].push(...items);
    i++;
  }
  return queues.map((q) => q.pop()).join("");
};

module.exports = solution;
