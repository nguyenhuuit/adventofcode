import { exec, execSync, ChildProcess, spawn } from 'child_process';
import { getInputFile, getSolutionFile } from './misc.js';

let childProcess: ChildProcess;

export const terminate = (): void => {
  if (childProcess && childProcess instanceof ChildProcess && !childProcess.killed) {
    childProcess.kill('SIGKILL')
  }
}

export const executeAsStream = (state: ExecutionInput): ChildProcess => {
  terminate()
  switch (state.language) {
    case 'javascript': {
      return executeJavascript(state);
    }
    case 'python': {
      return executePython(state);
    }

    case 'go': {
      return executeGolang(state);
    }
    default: throw Error('Unknown language');
  }
};
  
const executeJava = async (state: ExecutionInput) => {
  getSolutionFile(state);
  getInputFile(state);
  const before = performance.now();
  exec(`java part${state.part}.java ${state.inputMode}.txt`,
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
      // state.answer = lines[lines.length - 1] || '';
      // log(icon('🚀'), chalk.bold(chalk.greenBright(state.answer)), ` ⏱ ${(after-before).toFixed(2)}ms`);
    },
  );
};

const executePython = (state: ExecutionInput): ChildProcess => {
  childProcess = spawn(
    'python3',
    ['-u', 'src/drivers/python.py', state.year ,state.day, state.part, state.inputMode],
    { stdio: ['pipe', 'pipe', 'pipe', 'ipc']}
  )
  return childProcess
}

const executeJavascript = (state: ExecutionInput) => {
  childProcess = spawn('node',
    ['src/drivers/javascript.js', state.year, state.day, state.part, state.inputMode],
    {
      cwd: '.',
      stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    },
  );
  return childProcess
};

const executeGolang = (state: ExecutionInput): ChildProcess => {
  const solutionFile = getSolutionFile(state);
  const inputFile = getInputFile(state);
  execSync(`go build -buildmode=plugin -o drivers/golang.so ${solutionFile}`);
  childProcess = spawn(
    'go',
    ['run', 'src/drivers/golang.go', inputFile],
    {
      cwd: '.',
      stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    },
  );
  return childProcess
};
