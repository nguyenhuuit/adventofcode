import { useEffect, useState } from "react"
import axios from 'axios';

const HOST = 'https://adventofcode.com';
const REGEX_USERNAME = /class="user">(.+?) ?</;
const REGEX_STAR = /class="star-count">(.+?)\*</;

export const useYearInfo = (year: string, ts: number) => {
  const [userName, setUserName] = useState<any>('');
  const [star, setStar] = useState<any>('');
  useEffect(() => {
    const { SESSION } = process.env;
    if (!SESSION) {
      setUserName('')
      return
    }
    const url = `${HOST}/${year}`;
    axios({
      method: 'GET',
      url,
      headers: {
        cookie: `session=${SESSION};`
      }
    }).then(res => {
      if (res.data) {
        const matchUserName = REGEX_USERNAME.exec(res.data)
        if (matchUserName) {
          setUserName(matchUserName[1])
        }
        const matchStar = REGEX_STAR.exec(res.data)
        if (matchStar) {
          setStar(matchStar[1])
        }
      }
    });
  }, [year, ts])
  return { userName, star }
}