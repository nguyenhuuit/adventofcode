class Node {
  constructor(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

const KEY = 811589153;

const solution = input => {
  const nodes = input
    .split(/\n/)
    .map(int)
    .map(value => new Node(value*KEY));
  nodes.forEach((node, idx) => {
    node.prev = idx - 1 < 0 ? nodes.last() : nodes[idx-1];
    node.next = idx + 1 >= nodes.length ? nodes[0] : nodes[idx+1];
  })
  
  for (let k = 0; k < 10; k ++) {
    for (let i = 0; i < nodes.length ; i ++) {
      if (nodes[i].value === 0) continue;
      const totalStep = nodes[i].value % (nodes.length - 1);
      const step = nodes[i].value/abs(nodes[i].value);
      for (let j = 0; j !== totalStep; j+= step) {
        const { prev, next } = nodes[i];
        if (step > 0) {
          nodes[i].next = next.next;
          nodes[i].prev = next;
          next.next.prev = nodes[i];
          next.next = nodes[i]
        } else {
          nodes[i].next = prev;
          nodes[i].prev = prev.prev;
          prev.prev.next = nodes[i]
          prev.prev = nodes[i]
        }
        prev.next = next;
        next.prev = prev;
  
      }
    }
  }
  
  let ans = 0;
  let cur = nodes.find(n => n.value === 0);
  for (let i = 0; i <= 3000; i++) {
    if (i % 1000 === 0) {
      ans += cur.value
    }
    cur = cur.next;
  }
  return ans;
}

module.exports = solution
