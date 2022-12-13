require("./utils");
const fs = require('fs');
const chalk = require('chalk');
const chokidar = require('chokidar');
const { program, Option } = require('commander');

program
  .addOption(new Option('-y, --year <year>').default('2022'))
  .addOption(new Option('-d, --day <day>').makeOptionMandatory())
  .addOption(new Option('-p, --part <part>').makeOptionMandatory())

program.parse();

const { year, day, part } = program.opts();

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
    const input = fs.readFileSync(inputFile, "utf8");
    const result = solution(input);
    log('[RESULT] :', chalk.bold(chalk.greenBright(result)));
  } catch (err) {
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
    case 'p1': {
      watcher.unwatch(solutionFile);
      solutionFile = solutionFile.replace("part2", "part1");
      watcher.add(solutionFile);
      log("[WATCH]  :", solutionFile);
      execute();
      break;
    }
    case 'p2': {
      watcher.unwatch(solutionFile);
      solutionFile = solutionFile.replace("part1", "part2");
      watcher.add(solutionFile);
      log("[WATCH]  :", solutionFile);
      execute();
      break;
    }
    case 'sample': {
      watcher.unwatch(inputFile);
      inputFile = inputFile.replace("input", "sample");
      watcher.add(inputFile);
      log("[WATCH]  :", inputFile);
      execute();
      break;
    }
    case 'input': {
      watcher.unwatch(inputFile);
      inputFile = inputFile.replace("sample", "input");
      watcher.add(inputFile);
      log("[WATCH]  :", inputFile);
      execute();
      break;
    }
    default:
  }
});

execute();