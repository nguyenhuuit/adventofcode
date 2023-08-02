import { exec, execSync, ChildProcess } from 'child_process';
import fs from 'fs';
import { getInputFile, getSolutionFile } from './misc.js';

let childProcess: ChildProcess;

export const terminate = () => {
  if (childProcess && childProcess instanceof ChildProcess && !childProcess.killed) {
    childProcess.kill('SIGKILL')
  }
}

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
  
const executePython = (state: any) => {
  return new Promise((resolve) => {
    childProcess = exec(`python3 drivers/python.py ${state.year} ${state.day} ${state.part} ${state.input}`,
      { cwd: '.' },
      (error, stdout, stderr) => {
        resolve({ stdout, stderr, error })
      },
    );
  })
};
  
const executeJavascript = (state: any) => {
  return new Promise((resolve) => {
    childProcess = exec(`node drivers/javascript.js ${state.year} ${state.day} ${state.part} ${state.input}`,
      { cwd: '.' },
      (error, stdout, stderr) => {
        resolve({ stdout, stderr, error })
      },
    );
  })
};

const executeGolang = (state: any) => {
  const solutionFile = getSolutionFile(state);
  const inputFile = getInputFile(state);
  try {
    execSync(`go build -buildmode=plugin -o drivers/golang.so ${solutionFile}`);
  } catch (err) {
    // log(icon('⛔️'), err);
    return;
  }
  return new Promise((resolve) => {
    childProcess = exec(`go run drivers/golang.go ${inputFile} ${state.part}`,
      { cwd: '.' },
      (error, stdout, stderr) => {
        resolve({ stdout, stderr, error })
      },
    );
  });
};
