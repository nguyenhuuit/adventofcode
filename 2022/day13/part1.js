const compare = (a,b) => {
  if (isNumber(a) && isNumber(b)) {
    return a === b ? 0 : (a < b) ? 1 : -1
  } else if (isArray(a) && isArray(b)) {
    const length = min(a.length, b.length);
    for (let i = 0;i < length; i++) {
      const rs = compare(a[i], b[i]);
      if (rs !== 0) return rs;
    }
    return a.length === b.length ? 0 : (a.length < b.length) ? 1 : -1
  } else if (!isArray(a) && isArray(b)) {
    return compare([a], b);
  } else if (isArray(a) && !isArray(b)) {
    return compare(a, [b])
  }
}

export const solution = (input) => {
  return input
    .split(/\n\n/)
    .map((line) => line.split("\n")
    .map(eval))
    .map((v, i) => ({ v, i: i + 1}))
    .filter(i => compare(i.v[0], i.v[1]) === 1)
    .reduce((acc, v) => acc + v.i, 0);
}

