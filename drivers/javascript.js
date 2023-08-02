import './global.js';
import fs from 'fs';
import path from 'path'

const year = process.argv[2];
const day = process.argv[3];
const part = process.argv[4];
const input = process.argv[5];
const solutionFile = path.resolve(`./${year}/day${day}/part${part}.js`);
const inputFile = `./${year}/day${day}/${input}.txt`;

import(solutionFile).then(({ solution }) => {
  const input = fs.readFileSync(inputFile, 'utf8');
  const before = performance.now();
  const rs = solution(input);
  const after = performance.now();
  log(rs);
  log(`${(after-before).toFixed(3)}ms`);
});
