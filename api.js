require('dotenv').config();
const axios = require('axios');
const chalk = require('chalk');

const HOST = 'https://adventofcode.com'
const { SESSION } = process.env;

const submit = async (answer, level, day, year) => {
  const url = `${HOST}/${year}/day/${day}/answer`;
  const data = `level=${level}&answer=${answer}`;
  const resp = await axios({
    method: 'POST',
    url,
    data,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      cookie: `session=${SESSION};`
    }
  });
  let matches = resp.data.match(/(That's (not )?the right answer)/);
  if (matches) {
    if (matches[1] === "That's the right answer") {
      return chalk.bold(chalk.greenBright(answer + " -> Right answer"));
    } else {
      const waitingTime = resp.data.match(/please wait (.*) before/);
      if (waitingTime) {
        return chalk.bold(chalk.redBright(answer + " -> Wrong answer, please wait " + waitingTime[1] ));
      } else {
        return chalk.bold(chalk.redBright(answer + " -> Wrong answer"));
      }
    }
  }
  matches = resp.data.match(/You have (.*) left to wait/);
  if (matches) {
    return chalk.bold(chalk.redBright("Submit wrong answer recently, please wait " + matches[1] ));
  }
  return "Unknown response";
};

module.exports = {
  submit
};
