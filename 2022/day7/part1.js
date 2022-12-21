const solution = (input) => {
  const lines = input.split(/\n/);
  const sizes = {};
  const path = [];
  for (let i = 0; i < lines.length; i++) {
    let matches = lines[i].match(/^\$ cd (.+)$/);
    if (matches) {
      if (matches[1] === "..") {
        path.pop();
      } else {
        path.push(matches[1]);
      }
      continue;
    }
    matches = lines[i].match(/^([0-9]+) (.+)$/);
    if (matches) {
      const currentPath = path.join("-");
      if (sizes[currentPath]) {
        sizes[currentPath] = {
          value: sizes[currentPath].value + int(matches[1]),
          files: [...sizes[currentPath].files, matches[2]],
        };
      } else {
        sizes[currentPath] = {
          value: int(matches[1]),
          files: [matches[2]],
        };
      }
    }
  }
  const agg = {};
  let ans = 0;
  Object.keys(sizes).forEach((k) => {
    agg[k] = { value: 0, dirs: [] };
    Object.keys(sizes).forEach((kk) => {
      if (kk.startsWith(k)) {
        agg[k] = {
          value: agg[k].value + sizes[kk].value,
          dirs: [...agg[k].dirs, kk],
        };
      }
    });
    if (agg[k].value <= 100000) {
      ans += agg[k].value;
    }
  });
  return ans;
};

module.exports = solution;
