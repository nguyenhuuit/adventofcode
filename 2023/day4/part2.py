import re

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
  copies = [1]*len(n)
  for i in range(len(n)):
    for j in range(i+1, i+n[i]+1):
      copies[j] += copies[i]
  return sum(copies)
