import { exec, execSync } from 'child_process';
import fs from 'fs';
import { getInputFile, getSolutionFile } from './misc.js';

export const execute = async (state: any): Promise<any> => {
  switch (state.language) {
  case 'javascript': {
    return executeJavascript(state);
  }
  case 'python': {
    return executePython(state);
  }
  case 'java': {
    return executeJava(state);
  }
  case 'go': {
    return executeGolang(state);
  }
  default: throw Error('Unknown language');
  }
};
  
const executeJava = async (state: any) => {
  getSolutionFile(state);
  getInputFile(state);
  const before = performance.now();
  exec(`java part${state.part}.java ${state.input}.txt`,
    { cwd: `./${state.year}/day${state.day}/` },
    (error, stdout, stderr) => {
      if (error) {
        // log(stdout);
        // log(icon('⛔️'), stderr);
        return;
      }
      const after = performance.now();
      const lines = stdout.trim().split(/\n/);
      // log(lines.slice(0,lines.length -1).join('\n'));
      state.answer = lines[lines.length - 1];
      // log(icon('🚀'), chalk.bold(chalk.greenBright(state.answer)), ` ⏱ ${(after-before).toFixed(2)}ms`);
    },
  );
};
  
const executePython = async (state: any) => {
  getSolutionFile(state);
  getInputFile(state);
  return new Promise((resolve, reject) => {
    exec(`python3 drivers/python.py ${state.part} ${state.input} ${state.year} ${state.day}`,
      { cwd: '.' },
      (error, stdout, stderr) => {
        if (error) {
          return reject(stderr)
        }
        const lines = stdout.trim().split(/\n/);
        // log(lines.slice(0,lines.length -2).join('\n'));
        const answer = lines[lines.length - 2];
        const perfLog = lines[lines.length - 1];
        resolve(answer)
        // log(icon('🚀'), chalk.bold(chalk.greenBright(state.answer)), ` ⏱ ${perfLog}`);
      },
    );
  })
};
  
const executeJavascript = async (state: any) => {
  const solutionFile = getSolutionFile(state);
  const inputFile = await getInputFile(state);
  try {
    const solution = require(`.${solutionFile}`);
    const isSample = state.input === 'sample';
    const input = fs.readFileSync(inputFile, 'utf8');
    const before = performance.now();
    state.answer = solution(input, isSample);
    const after = performance.now();
    // log();
    // log(icon('🚀'), chalk.bold(chalk.greenBright(state.answer)), ` ⏱ ${(after-before).toFixed(3)}ms`);
  } catch (err) {
    state.answer = undefined;
    // log(icon('⛔️'), err);
  }
};

const executeGolang = async (state: any) => {
  const solutionFile = getSolutionFile(state);
  const inputFile = await getInputFile(state);
  try {
    execSync(`go build -buildmode=plugin -o drivers/golang.so ${solutionFile}`);
  } catch (err) {
    // log(icon('⛔️'), err);
    return;
  }
  exec(`go run drivers/golang.go ${inputFile} ${state.part}`,
    { cwd: '.' },
    (error, stdout, stderr) => {
      if (error) {
        // log(stdout);
        // log(icon('⛔️'), stderr);
        return;
      }
      const lines = stdout.trim().split(/\n/);
      // log(lines.slice(0,lines.length -2).join('\n'));
      state.answer = lines[lines.length - 2];
      const perfLog = lines[lines.length - 1];
      // log(icon('🚀'), chalk.bold(chalk.greenBright(state.answer)), ` ⏱ ${perfLog}`);
    },
  );
};
