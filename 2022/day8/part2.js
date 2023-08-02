const find = (v, arr, fromTail) => {
  if (arr.length === 0) return 0;
  let rs = 0;
  if (!fromTail) {
    for (let i = 0; i < arr.length; i++) {
      rs += 1;
      if (arr[i] >= v) {
        break;
      }
    }
  } else {
    for (let i = arr.length - 1; i >= 0; i--) {
      rs += 1;
      if (arr[i] >= v) {
        break;
      }
    }
  }
  return rs;
};

export const solution = (input) => {
  const rows = input
    .split(/\n/)
    .map((p) => p.split("").map(int));

  const cols = new Array(rows[0].length);
  for (let i = 0; i < cols.length; i++) {
    cols[i] = [];
  }
  for (let i = 0; i < cols.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      cols[i].push(rows[j][i]);
    }
  }

  let max = 0;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      const left = find(rows[i][j], rows[i].slice(0, j), true);
      const right = find(rows[i][j], rows[i].slice(j + 1, rows[i].length), false);
      const up = find(rows[i][j], cols[j].slice(0, i), true);
      const down = find(rows[i][j], cols[j].slice(i + 1, cols[j].length), false);
      const p = left * right * up * down;
      if (p > max) {
        max = p;
      }
    }
  }
  return max;
};

