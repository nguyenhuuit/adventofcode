const chalk = require('chalk');

const pallete = {
  ICON_BRACKET: '#d8dc0d',
  LINK: '#dec81a'
};

const icon = ch => {
  return `${chalk.hex(pallete.ICON_BRACKET).visible('[')}${ch}${chalk.hex(pallete.ICON_BRACKET).visible(']')}`;
};

const link = lk => {
  return `${chalk.hex(pallete.LINK).italic(lk)}`;
};

module.exports = {
  icon,
  link,
};