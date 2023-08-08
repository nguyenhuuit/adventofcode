import chalk from 'chalk'

const bg = (s: string): string => chalk.bold(chalk.greenBright(s))
const by = (s: string): string => chalk.bold(chalk.yellowBright(s))

export const HELP_MESSAGE = `Instructions:
${by('1')}: Run ${bg('part1')} solution       ${by('Enter')}: Re-run solution
${by('2')}: Run ${bg('part2')} solution         ${by('X')}  : Terminate solution
${by('S')}: Run solution with ${bg('sample')}   ${by('H')}  : Print the instructions
${by('I')}: Run solution with ${bg('input')}    ${by('Q')}  : Quit application`