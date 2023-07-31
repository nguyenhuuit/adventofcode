import fs from 'fs'
import { EXTENSIONS, TEMPLATES } from '../../utils/languages.js'
import { useMemo } from 'react';

export const useSolutionFile = (year: string, day: string, part: string, language: string): string => {
  const solutionFile = useMemo<string>((): string => {
    const dir = `./${year}/day${day}/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const file = `./${year}/day${day}/part${part}.${EXTENSIONS[language]}`;
    if (!fs.existsSync(file)) {
      const template = TEMPLATES[language];
      if (TEMPLATES[language]) {
        if (typeof template === 'function') {
          fs.writeFileSync(file, TEMPLATES[language]({ year, day, part }), { flag: 'as+' });
        } else {
          fs.writeFileSync(file, TEMPLATES[language], { flag: 'as+' });
        }
      }
    }
    return file
  }, [year, day, part, language]);
  return solutionFile;
}