import axios from 'axios';
import fs from 'fs';
import { useEffect, useState } from "react";

const HOST = 'https://adventofcode.com';
const SAMPLE_REGEX = /\(your puzzle input\)[\s\S]*?<code>([\s\S]+?)<\/code>/;
const decode = (str: string) => {
  return str
    .replaceAll('&gt;', '>')
    .replaceAll('&lt;', '<');
};

export const useInputFile = (year: string, day: string, inp: string, ts: number) => {
  const [name, setName] = useState('')
  const [size, setSize] = useState(0)
  useEffect(() => {
    const dir = `./${year}/day${day}/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const file = `./${year}/day${day}/${inp}.txt`;
    if (!fs.existsSync(file)) {
      let data = '';
      fs.writeFileSync(file, data, { flag: 'as+' });
    }
    const stats = fs.statSync(file)
    setName(file);
    setSize(stats.size);
    if (stats.size === 0 && inp === 'input' && process.env['SESSION']) {
      const url = `${HOST}/${year}/day/${day}/input`;
      axios({
        method: 'GET',
        url,
        headers: {
          cookie: `session=${process.env['SESSION']};`
        }
      }).then(res => {
        if (res.data) {
          fs.writeFileSync(file, res.data)
          const stats = fs.statSync(file)
          setSize(stats.size);
        }
      })
    }
    if (stats.size === 0 && inp === 'sample' && process.env['SESSION']) {
      const url = `${HOST}/${year}/day/${day}`;
      axios({
        method: 'GET',
        url,
        headers: {
          cookie: `session=${process.env['SESSION']};`
        }
      }).then(res => {
        if (res.data) {
          const matches = res.data.match(SAMPLE_REGEX);
          if (matches) {
            fs.writeFileSync(file, decode(matches[1]).trim());
            const stats = fs.statSync(file)
            setSize(stats.size);
          }
        }
      })
    }
  }, [year, day, inp, ts])
  return { name, size }
};