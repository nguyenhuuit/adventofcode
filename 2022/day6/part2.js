export const solution = (input) => {
  let queue = [];
  let i = 0;
  while (queue.length < 4) {
    if (!queue.includes(input[i])) {
      queue.push(input[i]);
    } else {
      while (queue.shift() !== input[i] && queue.length > 0) {}
      queue.push(input[i]);
    }
    i++;
  }
  queue = [];
  while (queue.length < 14) {
    if (!queue.includes(input[i])) {
      queue.push(input[i]);
    } else {
      while (queue.shift() !== input[i] && queue.length > 0) {}
      queue.push(input[i]);
    }
    i++;
  }
  return i;
};

