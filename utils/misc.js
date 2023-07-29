const fs = require('node:fs');
const { getSample, getInput } = require('./api');
const { TEMPLATES, EXTENSIONS } = require('./languages');
const { icon } = require('./formatter');
const chalk = require('chalk');

const getSolutionFile = (state) => {
  const dir = `./${state.year}/day${state.day}/`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const file = `./${state.year}/day${state.day}/part${state.part}.${EXTENSIONS[state.language]}`;
  if (!fs.existsSync(file)) {
    const template = TEMPLATES[state.language];
    if (TEMPLATES[state.language]) {
      if (typeof template === 'function') {
        fs.writeFileSync(file, TEMPLATES[state.language](state), { flag: 'as+' });
      } else {
        fs.writeFileSync(file, TEMPLATES[state.language], { flag: 'as+' });
      }
    }
  }
  return file;
};

const VALID_YEARS = ['2015','2016','2017','2018','2019','2020','2021','2022'];

const getInputFile = async (state) => {
  const dir = `./${state.year}/day${state.day}/`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const file = `./${state.year}/day${state.day}/${state.input}.txt`;
  if (!fs.existsSync(file)) {
    let data = '';
    if (VALID_YEARS.includes(state.year)) {
      try {
        if (state.input === 'sample') {
          data = await getSample(state.day, state.year);
        } else if (state.input === 'input') {
          data = await getInput(state.day, state.year);
        }
      } catch (err) {
        log(`\n${icon('⛔️')}`, chalk.red(`Cannot get the problem: ${err}`));
      }
      
    } else {
      log(`\n${icon('ℹ️')}`, chalk.yellow(`Topic: ${state.year}`));
    }
    data = data || '';
    fs.writeFileSync(file, data, { flag: 'as+' });
  }
  return file;
};

module.exports = {
  getInputFile,
  getSolutionFile
};
