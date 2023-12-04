import re

def calc(n):
  return 0 if n == 0 else 2**(n-1)

def parse(line):
  p = re.split(r': +', line)
  pp = re.split(r' \| +', p[1])
  ppp1 = re.split(r' +', pp[0])
  ppp2 = re.split(r' +', pp[1])
  c = 0
  for i in ppp1:
    if i in ppp2:
      c += 1
  return c

def solution(input):
  lines = input.split('\n')
  n = list(map(parse, lines))
  m = list(map(calc, n))
  return sum(m)

