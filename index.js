require('./utils/global');

const chokidar = require('chokidar');
const chalk = require('chalk');
const { program, Option } = require('commander');
const { submit } = require('./utils/api');
const { getInputFile, getSolutionFile } = require('./utils/misc');
const { execute } = require('./utils/executors');

program
  .addOption(new Option('-y, --year <year>').default('2022'))
  .addOption(new Option('-l, --language <language>').default('javascript'))
  .addOption(new Option('-d, --day <day>').makeOptionMandatory())
  .addOption(new Option('-p, --part <part>').makeOptionMandatory());

program.parse();

const italicOrange = chalk.hex('#FF8800').italic;
const boldOrange = chalk.hex('#FF8800').bold;

const { year, day, part, language } = program.opts();

const state = {
  year,
  day,
  part,
  language,
  input: 'sample',
  answer: undefined,
};

log('[🚗]', boldOrange(`Year ${year}, day ${day}, part ${part}`));

const start = async () => {
  const solutionFile = getSolutionFile(state);
  const inputFile = await getInputFile(state);

  const watcher = chokidar.watch([solutionFile, inputFile]);
  watcher.on('change', path => {
    log(`\n[📝] ${italicOrange(path)}`);
    if (state.language === 'javascript') {
      delete require.cache[require.resolve(solutionFile)];
    }
    execute(state);
  });
  process.stdin.on('data', data => {
    const cmd = data.toString().trim();
    process.stdout.moveCursor(0, -1);
    process.stdout.clearLine(1);
    process.stdout.moveCursor(0, 1);
    switch (cmd) {
    case 'rp':
    case 'repeat': {
      if (state.language === 'javascript') {
        delete require.cache[require.resolve(getSolutionFile(state))];
      }
      execute(state);
      break;
    }
    case 'p1': {
      watcher.unwatch(getSolutionFile(state));
      state.part = 1;
      watcher.add(getSolutionFile(state));
      log('[📺]', italicOrange(getSolutionFile(state).replace('./', '')));
      delete require.cache[require.resolve(getSolutionFile(state))];
      execute(state);
      break;
    }
    case 'p2': {
      watcher.unwatch(getSolutionFile(state));
      state.part = 2;
      watcher.add(getSolutionFile(state));
      log('[📺]', italicOrange(getSolutionFile(state).replace('./', '')));
      delete require.cache[require.resolve(getSolutionFile(state))];
      execute(state);
      break;
    }
    case 's':
    case 'sample': {
      getInputFile(state).then(oldFile => {
        watcher.unwatch(oldFile);
        state.input = 'sample';
        getInputFile(state).then(newFile => {
          watcher.add(newFile);
          log('[📺]', italicOrange(newFile.replace('./', '')));
          execute(state);
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
          log('[📺]', italicOrange(newFile.replace('./', '')));
          execute(state);
        });
      });
      break;
    }
    case 'su':
    case 'sm':
    case 'submit': {
      if (state.answer !== null && state.answer !== undefined) {
        submit(state.answer, state.part, state.day, state.year)
          .then(rs => {
            if (rs.includes('Right answer')) {
              log(`[🟢] : ${rs}`);
            } else {
              log(`[🔴] : ${rs}`);
            }
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
      execute(state);
      break;
    }
    case 'quit':
    case 'exit':
    case 'e':
    case 'q': process.exit();
    }
  });
  execute(state);
};

start();
