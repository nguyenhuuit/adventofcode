const { Select } = require('enquirer');

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
  // process.stdin.setRawMode(true);
  return { year, day, part, language };
};

module.exports = { validate, LANGUAGE_MAP };