const mergeRanges = ranges => {
  const r = ranges;
  while (true) {
    let merged = false;
    for (let i = 0; i < r.length - 1; i++) {
      for (let j = i + 1; j < r.length; j++) {
        const [start1, end1] = ranges[i];
        const [start2, end2] = ranges[j];
        if (max(end1, end2) - min(start1, start2) <= (end1 - start1 + end2 - start2)) {
          r.splice(j, 1);
          r.splice(i, 1);
          r.push([min(start1, start2), max(end1, end2)]);
          merged = true;
          break;
        }
      }
      if (merged) { break; }
    }
    if (!merged) { break; }
  }
  return r;
}

const solution = (input, isSample) => {
  const Y = isSample ? 10 : 2000000;
  let beaconsInRow = new Set();
  const ranges = input
    .split(/\n/)
    .map(line => line.match(/.*x=([-0-9]+), y=([-0-9]+).*x=([-0-9]+), y=([-0-9]+)/).slice(1,5).map(int))
    .map(line => {
      const [sensorX, sensorY, beaconX, beaconY] = line;
      if (beaconY === Y) {
        beaconsInRow.add(beaconX);
      }
      const distance = abs(sensorX - beaconX) + abs(sensorY - beaconY);
      const X = distance > abs(sensorY - Y) ? distance - abs(sensorY - Y) : 0;
      return X === 0 ? null : [sensorX - X, sensorX + X];
    })
    .filter(range => range);
  return mergeRanges(ranges)
    .reduce((acc, range) => {
      let beaconInRange = 0;
      beaconsInRow.forEach(b => {
        if (b >= range[0] && b <= range[1]) {
          beaconInRange++;
        }
      })
      acc += (range[1] - range[0] + 1 - beaconInRange);
      return acc;
    }, 0);
}

