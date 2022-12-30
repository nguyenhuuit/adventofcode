require('./utils/global');
const { exec } = require('child_process');
const fs = require('fs');
const chalk = require('chalk');
const chokidar = require('chokidar');
const { program, Option } = require('commander');
const { submit } = require('./utils/api');
const { getInputFile, getSolutionFile } = require('./utils/misc');

program
  .addOption(new Option('-y, --year <year>').default('2022'))
  .addOption(new Option('-l, --language <language>').default('javascript'))
  .addOption(new Option('-d, --day <day>').makeOptionMandatory())
  .addOption(new Option('-p, --part <part>').makeOptionMandatory());

program.parse();

const { year, day, part, language } = program.opts();

const state = {
  year,
  day,
  part,
  language,
  input: 'sample',
  answer: undefined,
};

log(`YEAR=${year} DAY=${day} PART=${part}`);

const execute = async () => {
  switch (state.language) {
  case 'javascript': executeJavascript(); break;
  case 'python': executePython(); break;
  case 'java': executeJava(); break;
  default: throw Error('Unknown language');
  }
};

const executeJava = async () => {
  getSolutionFile(state);
  getInputFile(state);
  const before = performance.now();
  exec(`java part${state.part}.java ${state.input}.txt`,
    { cwd: `./${state.year}/day${state.day}/` },
    (error, stdout, stderr) => {
      if (error) {
        log(stdout);
        log('[ERROR]  :', stderr);
        return;
      }
      const after = performance.now();
      const lines = stdout.trim().split(/\n/);
      log(lines.slice(0,lines.length -1).join('\n'));
      state.answer = lines.last();
      log('[RESULT] :', chalk.bold(chalk.greenBright(state.answer)), `(${(after-before).toFixed(2)}ms)`);
    },
  );
};

const executePython = async () => {
  getSolutionFile(state);
  getInputFile(state);
  const before = performance.now();
  exec(`python -B -c 'from part${state.part} import solution\nwith open("${state.input}.txt") as inp: print(solution(inp.read().strip()));'`,
    { cwd: `./${state.year}/day${state.day}/` },
    (error, stdout, stderr) => {
      if (error) {
        log(stdout);
        log('[ERROR]  :', stderr);
        return;
      }
      const after = performance.now();
      const lines = stdout.trim().split(/\n/);
      log(lines.slice(0,lines.length -1).join('\n'));
      state.answer = lines.last();
      log('[RESULT] :', chalk.bold(chalk.greenBright(state.answer)), `(${(after-before).toFixed(2)}ms)`);
    },
  );
};

const executeJavascript = async () => {
  const solutionFile = getSolutionFile(state);
  const inputFile = await getInputFile(state);
  try {
    const solution = require(solutionFile);
    const isSample = state.input === 'sample';
    const input = fs.readFileSync(inputFile, 'utf8');
    const before = performance.now();
    state.answer = solution(input, isSample);
    const after = performance.now();
    log('[RESULT] :', chalk.bold(chalk.greenBright(state.answer)), `(${(after-before).toFixed(2)}ms)`);
  } catch (err) {
    state.answer = undefined;
    log('[ERROR]  :', err);
  }
};

const start = async () => {
  const solutionFile = getSolutionFile(state);
  const inputFile = await getInputFile(state);

  const watcher = chokidar.watch([solutionFile, inputFile]);
  watcher.on('change', path => {
    log(`[UPDATED]: ${path}`);
    if (state.language === 'javascript') {
      delete require.cache[require.resolve(solutionFile)];
    }
    execute();
  });
  process.stdin.on('data', data => {
    const cmd = data.toString().trim();
    switch (cmd) {
    case 'rp':
    case 'repeat': {
      if (state.language === 'javascript') {
        delete require.cache[require.resolve(getSolutionFile(state))];
      }
      execute();
      break;
    }
    case 'p1': {
      watcher.unwatch(getSolutionFile(state));
      state.part = 1;
      watcher.add(getSolutionFile(state));
      log('[WATCH]  :', getSolutionFile(state).replace('./', ''));
      delete require.cache[require.resolve(getSolutionFile(state))];
      execute();
      break;
    }
    case 'p2': {
      watcher.unwatch(getSolutionFile(state));
      state.part = 2;
      watcher.add(getSolutionFile(state));
      log('[WATCH]  :', getSolutionFile(state).replace('./', ''));
      delete require.cache[require.resolve(getSolutionFile(state))];
      execute();
      break;
    }
    case 's':
    case 'sample': {
      getInputFile(state).then(oldFile => {
        watcher.unwatch(oldFile);
        state.input = 'sample';
        getInputFile(state).then(newFile => {
          watcher.add(newFile);
          log('[WATCH]  :', newFile.replace('./', ''));
          execute();
        });
      });
      break;
    }
    case 'i':
    case 'input': {
      getInputFile(state).then(oldFile => {
        watcher.unwatch(oldFile);
        state.input = 'input';
        getInputFile(state).then(newFile => {
          watcher.add(newFile);
          log('[WATCH]  :', newFile.replace('./', ''));
          execute();
        });
      });
      break;
    }
    case 'submit': {
      if (state.answer !== null && state.answer !== undefined) {
        submit(state.answer, state.part, state.day, state.year)
          .then(rs => {
            log(`[SUBMIT] : ${rs}`);
          })
          .catch(err => {
            log(err);
            log(`[SUBMIT] : Failed ${err.message}`);
          });
      }
      break;
    }
    case 'javascript':
    case 'python': {
      watcher.unwatch(getSolutionFile(state));
      state.language = cmd;
      watcher.add(getSolutionFile(state));
      execute();
      break;
    }
    case 'quit':
    case 'exit':
    case 'e':
    case 'q': process.exit();
    }
  });
  execute();
};

start();
