const { exec, execSync } = require('child_process');
const fs = require('fs');
const chalk = require('chalk');
const { getInputFile, getSolutionFile } = require('./misc');
const { icon } = require('./formatter');

const execute = async (state) => {
  switch (state.language) {
  case 'javascript': executeJavascript(state); break;
  case 'python': executePython(state); break;
  case 'java': executeJava(state); break;
  case 'go': executeGolang(state); break;
  default: throw Error('Unknown language');
  }
};
  
const executeJava = async (state) => {
  getSolutionFile(state);
  getInputFile(state);
  const before = performance.now();
  exec(`java part${state.part}.java ${state.input}.txt`,
    { cwd: `./${state.year}/day${state.day}/` },
    (error, stdout, stderr) => {
      if (error) {
        log(stdout);
        log(icon('⛔️'), stderr);
        return;
      }
      const after = performance.now();
      const lines = stdout.trim().split(/\n/);
      log(lines.slice(0,lines.length -1).join('\n'));
      state.answer = lines.last();
      log(icon('🚀'), chalk.bold(chalk.greenBright(state.answer)), ` ⏱ ${(after-before).toFixed(2)}ms`);
    },
  );
};
  
const executePython = async (state) => {
  getSolutionFile(state);
  getInputFile(state);
  exec(`python drivers/python.py ${state.part} ${state.input} ${state.year} ${state.day}`,
    { cwd: '.' },
    (error, stdout, stderr) => {
      if (error) {
        log(stdout);
        log(icon('⛔️'), stderr);
        return;
      }
      const lines = stdout.trim().split(/\n/);
      log(lines.slice(0,lines.length -2).join('\n'));
      state.answer = lines[lines.length - 2];
      const perfLog = lines.last();
      log(icon('🚀'), chalk.bold(chalk.greenBright(state.answer)), ` ⏱ ${perfLog}`);
    },
  );
};
  
const executeJavascript = async (state) => {
  const solutionFile = getSolutionFile(state);
  const inputFile = await getInputFile(state);
  try {
    const solution = require(`.${solutionFile}`);
    const isSample = state.input === 'sample';
    const input = fs.readFileSync(inputFile, 'utf8');
    const before = performance.now();
    state.answer = solution(input, isSample);
    const after = performance.now();
    log();
    log(icon('🚀'), chalk.bold(chalk.greenBright(state.answer)), ` ⏱ ${(after-before).toFixed(3)}ms`);
  } catch (err) {
    state.answer = undefined;
    log(icon('⛔️'), err);
  }
};

const executeGolang = async (state) => {
  const solutionFile = getSolutionFile(state);
  const inputFile = await getInputFile(state);
  try {
    execSync(`go build -buildmode=plugin -o drivers/golang.so ${solutionFile}`);
  } catch (err) {
    log(icon('⛔️'), err);
    return;
  }
  exec(`go run drivers/golang.go ${inputFile} ${state.part}`,
    { cwd: '.' },
    (error, stdout, stderr) => {
      if (error) {
        log(stdout);
        log(icon('⛔️'), stderr);
        return;
      }
      const lines = stdout.trim().split(/\n/);
      log(lines.slice(0,lines.length -2).join('\n'));
      state.answer = lines[lines.length - 2];
      const perfLog = lines.last();
      log(icon('🚀'), chalk.bold(chalk.greenBright(state.answer)), ` ⏱ ${perfLog}`);
    },
  );
};

module.exports = {
  execute
};
