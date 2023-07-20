const { Select, Input } = require('enquirer');

const LANGUAGE_MAP = {
  Python: 'python',
  python: 'python',
  Javascript: 'javascript',
  Java: 'java',
  'C++': 'app'
};


const validate = async (opts) => {
  let { year, day, part, language } = opts;
  if (!language) {
    const promptLanguage = new Select({
      name: 'language',
      message: 'Select programming language',
      choices: [
        { name: 'Python' },
        { name: 'Javascript' },
        { name: 'Java' },
        { name: 'C++' },
      ]
    });
       
    language = await promptLanguage.run();
    log();
  }
  if (!year) {
    const promptYear = new Input({
      name: 'year',
      message: 'Select year',
    });
       
    const answer = await promptYear.run();
    year = answer;
    log();
  }
  if (!day) {
    const promptDay = new Input({
      name: 'day',
      message: 'Select day',
    });
       
    const answer = await promptDay.run();
    day = answer;
    log();
  }
  if (!part) {
    const promptPart = new Select({
      name: 'part',
      message: 'Select part',
      choices: [
        { name: 'Part 1' },
        { name: 'Part 2' },
      ]
    });
       
    part = await promptPart.run() === 'Part 1' ? 1 : 2;
    log();
  }
  process.stdin.resume();
  return { year, day, part, language };
};

module.exports = {
  validate,
  LANGUAGE_MAP,
};