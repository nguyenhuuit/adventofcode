import fs from 'fs';
import { useMemo } from "react";

export const useInputFile = (year: string, day: string, inp: string) => {
  const inputFile = useMemo(() => {
    const dir = `./${year}/day${day}/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const file = `./${year}/day${day}/${inp}.txt`;
    if (!fs.existsSync(file)) {
      let data = '';
      fs.writeFileSync(file, data, { flag: 'as+' });
    }
    return file;
  }, [year, day, inp])
  return inputFile
};