require("./utils");
const { exec } = require('child_process');
const fs = require('fs');
const chalk = require('chalk');
const chokidar = require('chokidar');
const { program, Option } = require('commander');
const { submit, getSample, getInput } = require("./api");
const { EXTS, TEMPLATES } = require("./constants");

program
  .addOption(new Option('-y, --year <year>').default('2022'))
  .addOption(new Option('-l, --language <language>').default('javascript'))
  .addOption(new Option('-d, --day <day>').makeOptionMandatory())
  .addOption(new Option('-p, --part <part>').makeOptionMandatory())

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

const getSolutionFile = () => {
  const dir = `./${state.year}/day${state.day}/`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const file = `./${state.year}/day${state.day}/part${state.part}.${EXTS[state.language]}`;
  if (!fs.existsSync(file)) {
    if (TEMPLATES[state.language]) {
      fs.writeFileSync(file, TEMPLATES[state.language], { flag: 'as+' });
    }
  }
  return file;
}

const getInputFile = async () => {
  const dir = `./${state.year}/day${state.day}/`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const file = `./${state.year}/day${state.day}/${state.input}.txt`;
  if (!fs.existsSync(file)) {
    let data = '';
    if (state.input === 'sample') {
      data = await getSample(state.day, state.year);
    } else if (state.input === 'input') {
      data = await getInput(state.day, state.year);
    }
    fs.writeFileSync(file, data, { flag: 'as+' });
  }
  return file;
};

log(`YEAR=${year} DAY=${day} PART=${part}`)

const execute = async () => {
  switch (state.language) {
    case 'javascript': executeJavascript(); break;
    case 'python': executePython(); break;
    case 'java': executeJava(); break;
    default: throw Error('Unknown language')
  }
}

const executeJava = async () => {
  getSolutionFile();
  getInputFile();
  const before = performance.now();
  exec(`java part${state.part}.java ${state.input}.txt`,
    { cwd: `./${state.year}/day${state.day}/` },
    (error, stdout, stderr) => {
      if (error) {
        log(stdout)
        log('[ERROR]  :', stderr);
        return;
      }
      const after = performance.now();
      const lines = stdout.trim().split(/\n/)
      log(lines.slice(0,lines.length -1).join("\n"))
      state.answer = lines.last();
      log('[RESULT] :', chalk.bold(chalk.greenBright(state.answer)), `(${(after-before).toFixed(2)}ms)`);
    },
  )
}

const executePython = async () => {
  getSolutionFile();
  getInputFile();
  const before = performance.now();
  exec(`python -B -c 'from part${state.part} import solution\nwith open("${state.input}.txt") as inp: print(solution(inp.read().strip()));'`,
    { cwd: `./${state.year}/day${state.day}/` },
    (error, stdout, stderr) => {
      if (error) {
        log(stdout)
        log('[ERROR]  :', stderr);
        return;
      }
      const after = performance.now();
      const lines = stdout.trim().split(/\n/)
      log(lines.slice(0,lines.length -1).join("\n"))
      state.answer = lines.last();
      log('[RESULT] :', chalk.bold(chalk.greenBright(state.answer)), `(${(after-before).toFixed(2)}ms)`);
    },
  )
}

const executeJavascript = async () => {
  const solutionFile = getSolutionFile();
  const inputFile = await getInputFile();
  try {
    const solution = require(solutionFile);
    const isSample = state.input === 'sample';
    const input = fs.readFileSync(inputFile, "utf8");
    const before = performance.now();
    state.answer = solution(input, isSample);
    const after = performance.now();
    log('[RESULT] :', chalk.bold(chalk.greenBright(state.answer)), `(${(after-before).toFixed(2)}ms)`);
  } catch (err) {
    state.answer = undefined;
    log('[ERROR]  :', err)
  }
}

const start = async () => {
  const solutionFile = getSolutionFile();
  const inputFile = await getInputFile();

  const watcher = chokidar.watch([solutionFile, inputFile]);
  watcher.on('change', path => {
    log(`[UPDATED]: ${path}`);
    if (state.language === 'javascript') {
      delete require.cache[require.resolve(solutionFile)]
    }
    execute();
  });
  process.stdin.on('data', data => {
    const cmd = data.toString().trim();
    switch (cmd) {
      case "rp":
      case "repeat": {
        // delete require.cache[require.resolve(getSolutionFile())]
        execute();
        break;
      }
      case 'p1': {
        watcher.unwatch(getSolutionFile());
        state.part = 1;
        watcher.add(getSolutionFile());
        log("[WATCH]  :", getSolutionFile().replace("./", ""));
        delete require.cache[require.resolve(getSolutionFile())];
        execute();
        break;
      }
      case 'p2': {
        watcher.unwatch(getSolutionFile());
        state.part = 2;
        watcher.add(getSolutionFile());
        log("[WATCH]  :", getSolutionFile().replace("./", ""));
        delete require.cache[require.resolve(getSolutionFile())];
        execute();
        break;
      }
      case 's':
      case 'sample': {
        getInputFile().then(oldFile => {
          watcher.unwatch(oldFile);
          state.input = 'sample';
          getInputFile().then(newFile => {
            watcher.add(newFile);
            log("[WATCH]  :", newFile.replace("./", ""));
            execute();
          })
        })
        break;
      }
      case 'i':
      case 'input': {
        getInputFile().then(oldFile => {
          watcher.unwatch(oldFile);
          state.input = 'input';
          getInputFile().then(newFile => {
            watcher.add(newFile);
            log("[WATCH]  :", newFile.replace("./", ""));
            execute();
          })
        })
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
          })
        }
        break;
      }
      case 'javascript':
      case 'python': {
        watcher.unwatch(getSolutionFile());
        state.language = cmd;
        watcher.add(getSolutionFile());
        execute();
        break;
      }
      case 'quit':
      case 'exit':
      case 'e':
      case 'q': process.exit();
      default:
    }
  });
  execute();
}

start();
