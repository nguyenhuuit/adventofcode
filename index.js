require("./utils");
const fs = require('fs');
const chalk = require('chalk');
const chokidar = require('chokidar');
const { program, Option } = require('commander');
const { submit } = require("./api");

program
  .addOption(new Option('-y, --year <year>').default('2022'))
  .addOption(new Option('-d, --day <day>').makeOptionMandatory())
  .addOption(new Option('-p, --part <part>').makeOptionMandatory())

program.parse();

const { year, day, part } = program.opts();

const state = {
  year,
  day,
  part,
  answer: undefined,
};

log(`YEAR=${year} DAY=${day} PART=${part}`)

let solutionFile = `./${year}/day${day}/part${part}.js`;
let inputFile = `./${year}/day${day}/sample.txt`;

const filesToWatch = [
  solutionFile,
  inputFile
]

const watcher = chokidar.watch(filesToWatch);
const execute = () => {
  try {
    const solution = require(solutionFile);
    const isSample = inputFile.includes('sample');
    const input = fs.readFileSync(inputFile, "utf8");
    const before = performance.now();
    const result = solution(input, isSample);
    const after = performance.now();
    state.answer = result;
    log('[RESULT] :', chalk.bold(chalk.greenBright(result)), `(${(after-before).toFixed(2)}ms)`);
  } catch (err) {
    state.answer = undefined;
    log('[ERROR]  :', err)
  }
}

watcher.on('change', path => {
  log(`[UPDATED]: ${path}`);
  if (solutionFile.endsWith(path)) {
    delete require.cache[require.resolve(solutionFile)]
  }
  execute();
});

process.stdin.on('data', data => {
  const cmd = data.toString().trim();
  switch (cmd) {
    case "rp":
    case "repeat": {
      delete require.cache[require.resolve(solutionFile)]
      execute();
      break;
    }
    case 'p1': {
      watcher.unwatch(solutionFile);
      solutionFile = solutionFile.replace("part2", "part1");
      watcher.add(solutionFile);
      log("[WATCH]  :", solutionFile.replace("./", ""));
      delete require.cache[require.resolve(solutionFile)]
      state.part = 1;
      execute();
      break;
    }
    case 'p2': {
      watcher.unwatch(solutionFile);
      solutionFile = solutionFile.replace("part1", "part2");
      watcher.add(solutionFile);
      log("[WATCH]  :", solutionFile.replace("./", ""));
      delete require.cache[require.resolve(solutionFile)];
      state.part = 2;
      execute();
      break;
    }
    case 's':
    case 'sample': {
      watcher.unwatch(inputFile);
      inputFile = inputFile.replace("input", "sample");
      watcher.add(inputFile);
      log("[WATCH]  :", inputFile.replace("./", ""));
      execute();
      break;
    }
    case 'i':
    case 'input': {
      watcher.unwatch(inputFile);
      inputFile = inputFile.replace("sample", "input");
      watcher.add(inputFile);
      log("[WATCH]  :", inputFile.replace("./", ""));
      execute();
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
    case 'quit':
    case 'exit':
    case 'q': process.exit();
    default:
  }
});

execute();