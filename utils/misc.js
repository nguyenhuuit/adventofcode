const fs = require('node:fs');
const { getSample, getInput } = require('./api');
const { TEMPLATES, EXTENSIONS } = require('./languages');

const getSolutionFile = (state) => {
  const dir = `./${state.year}/day${state.day}/`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const file = `./${state.year}/day${state.day}/part${state.part}.${EXTENSIONS[state.language]}`;
  if (!fs.existsSync(file)) {
    if (TEMPLATES[state.language]) {
      fs.writeFileSync(file, TEMPLATES[state.language], { flag: 'as+' });
    }
  }
  return file;
};

const getInputFile = async (state) => {
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
    data = data || ''
    fs.writeFileSync(file, data, { flag: 'as+' });
  }
  return file;
};

module.exports = {
  getInputFile,
  getSolutionFile
};
