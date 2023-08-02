import { EXTENSIONS } from './languages.js';

export const getSolutionFile = (state: any) => {
  const file = `./${state.year}/day${state.day}/part${state.part}.${EXTENSIONS[state.language]}`;
  return file;
};

export const getInputFile = (state: any) => {
  const file = `./${state.year}/day${state.day}/${state.input}.txt`;
  return file;
};
