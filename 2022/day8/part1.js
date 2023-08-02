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

  let visible = 0;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (
        rows[i][j] > max(...rows[i].slice(0, j)) ||
        rows[i][j] > max(...rows[i].slice(j + 1, rows[i].length)) ||
        rows[i][j] > max(...cols[j].slice(0, i)) ||
        rows[i][j] > max(...cols[j].slice(i + 1, cols[j].length))
      ) {
        visible += 1;
      }
    }
  }
  return visible;
};

