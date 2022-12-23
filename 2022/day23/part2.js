const delta = {
  N:  [ 0,-1],
  S:  [ 0, 1],
  W:  [-1, 0],
  E:  [ 1, 0],
  NW: [-1,-1],
  NE: [ 1,-1],
  SW: [-1, 1],
  SE: [ 1, 1]
}

const calcNextMove = (star, positions) => {
  let nextMove;
  let nextDirection;
  const { x, y } = star;
  for (let i = 0; i < 4; i++) {
    const di = star.directions[i];
    if (Object.values(delta).every(([dx, dy]) => !positions.hasArr([x + dx, y + dy]))) {
      break;
    }
    switch (di) {
      case 'N': {
        if ([delta.NW, delta.N, delta.NE].every(([dx, dy]) => !positions.hasArr([x + dx, y + dy]))) {
          nextMove = [delta.N[0] + x, delta.N[1] + y];
          nextDirection = 'N';
        }
        break;
      }
      case 'S': {
        if ([delta.SW, delta.S, delta.SE].every(([dx, dy]) => !positions.hasArr([x + dx, y + dy]))) {
          nextMove = [delta.S[0] + x, delta.S[1] + y];
          nextDirection = 'S';
        }
        break;
      }
      case 'W': {
        if ([delta.SW, delta.W, delta.NW].every(([dx, dy]) => !positions.hasArr([x + dx, y + dy]))) {
          nextMove = [delta.W[0] + x, delta.W[1] + y];
          nextDirection = 'W';
        }
        break;
      }
      case 'E': {
        if ([delta.SE, delta.E, delta.NE].every(([dx, dy]) => !positions.hasArr([x + dx, y + dy]))) {
          nextMove = [delta.E[0] + x, delta.E[1] + y];
          nextDirection = 'E';
        }
        break;
      }
    }
    if (nextMove) break;
  }
  star.nextMove = nextMove;
  star.nextDirection = nextDirection;

  star.directions = [...star.directions.slice(1), star.directions[0]];
}

const solution = input => {
  const stars = []
  const positions = new Set();
  input.split(/\n/).forEach((line, y) => {
    line.split("").forEach((ch, x) => {
      if (ch === '#') {
        const s = {
          x,
          y,
          directions: ['N', 'S', 'W', 'E'],
          moves: []
        }
        stars.push(s);
        positions.addArr([x,y]);
      }
    })
  });
  let round = 0;
  while (true) {
    const nm = {};
    stars.forEach(st => {
      calcNextMove(st, positions);
      if (st.nextMove) {
        const [x, y] = st.nextMove;
        const ms = `${x},${y}`;
        nm[ms] = nm[ms] ? nm[ms] + 1 : 1;
      }
    });
    if (Object.keys(nm).length === 0) {
      break;
    }

    stars.forEach(st => {
      if (st.nextMove) {
        const [x, y] = st.nextMove;
        const ms = `${x},${y}`;
        if (nm[ms] === 1) {
          positions.deleteArr([st.x, st.y]);
          st.x = x;
          st.y = y;
          positions.addArr([x, y]);
        }
      }
    })
    round++;
  }
  return round+1;
}

module.exports = solution;
