require('./utils/global');

const chokidar = require('chokidar');
const chalk = require('chalk');
const { program, Option } = require('commander');
const { submit } = require('./utils/api');
const { getInputFile, getSolutionFile } = require('./utils/misc');
const { execute } = require('./utils/executors');
const { icon } = require('./utils/formatter');
const { validate, LANGUAGE_MAP } = require('./utils/prompter');

program
  .addOption(new Option('-y, --year <year>'))
  .addOption(new Option('-l, --language <language>').default('python'))
  .addOption(new Option('-d, --day <day>'))
  .addOption(new Option('-p, --part <part>'));

program.parse();

const italicOrange = chalk.hex('#FF8800').italic;
const boldOrange = chalk.hex('#FF8800').bold;

const state = {
  input: 'sample',
  answer: undefined,
};

const start = async () => {
  const solutionFile = getSolutionFile(state);
  const inputFile = await getInputFile(state);

  const watcher = chokidar.watch([solutionFile, inputFile]);
  watcher.on('change', path => {
    log();
    log(icon('📝'), italicOrange(path));
    if (state.language === 'javascript') {
      delete require.cache[require.resolve(solutionFile)];
    }
    execute(state);
  });
  process.stdin.setRawMode(true);
  process.stdin.on('data', data => {
    if (data == '\u0003'  /* Ctrl C */) {
      process.exit();
    }
    const cmd = data.toString().trim();
    if (!process.stdin.isRaw) {
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine(1);
      process.stdout.moveCursor(0, 1);
    } else {
      log();
    }
    if (data == '\u000d' /* Enter */) {
      process.stdout.moveCursor(0, -1);
      if (state.language === 'javascript') {
        delete require.cache[require.resolve(getSolutionFile(state))];
      }
      execute(state);
      return;
    }
    switch (cmd) {
    case 'r':
    case 'repeat': {
      if (state.language === 'javascript') {
        delete require.cache[require.resolve(getSolutionFile(state))];
      }
      execute(state);
      break;
    }
    case '1':
    case 'p1': {
      watcher.unwatch(getSolutionFile(state));
      state.part = 1;
      watcher.add(getSolutionFile(state));
      log(icon('📺'), italicOrange(getSolutionFile(state).replace('./', '')));
      delete require.cache[require.resolve(getSolutionFile(state))];
      execute(state);
      break;
    }
    case '2':
    case 'p2': {
      watcher.unwatch(getSolutionFile(state));
      state.part = 2;
      watcher.add(getSolutionFile(state));
      log(icon('📺'), italicOrange(getSolutionFile(state).replace('./', '')));
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
          log(icon('📺'), italicOrange(newFile.replace('./', '')));
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
          log(icon('📺'), italicOrange(newFile.replace('./', '')));
          execute(state);
        });
      });
      break;
    }
    case 'u':
    case 'submit': {
      if (state.answer !== null && state.answer !== undefined) {
        submit(state.answer, state.part, state.day, state.year)
          .then(rs => {
            if (rs.includes('Right answer')) {
              log(icon('🟢'), rs);
            } else {
              log(icon('🔴'), rs);
            }
          })
          .catch(err => {
            log(err);
            log(icon('🔴'), `Failed ${err.message}`);
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
    case 'c':
    case 'cls':
    case 'clear': console.clear(); break;

    case 'quit':
    case 'exit':
    case 'e':
    case 'q': process.exit();
    }
  });
  execute(state);
};

validate(program.opts())
  .then(result => {
    const { year, day, part, language } = result;
    state.year = year;
    state.day = day;
    state.part = part;
    state.language = LANGUAGE_MAP[language];
    log(icon('🚗'), boldOrange(`Year ${year}, day ${day}, part ${part}, language ${language}`));
    start();
  });


