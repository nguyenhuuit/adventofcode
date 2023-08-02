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
    .reduce((acc, v) => [...acc, ...v], [])
    .concat([[[2]]])
    .concat([[[6]]])
    .sort((a,b) => compare(b,a))
    .map(JSON.stringify)
    .map((v,i) => ({ v, i: i + 1 }))
    .filter(i => ['[[2]]', '[[6]]'].includes(i.v))
    .reduce((acc, v) => acc*v.i, 1)
}

