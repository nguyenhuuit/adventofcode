import re
def cnt(t, d):
  rs = 0
  for i in range(1,t):
    if i*(t-i) > d:
      rs += 1
  return rs

def solution(input):
  lines = input.split('\n')
  time = list(map(int, re.split(' +', lines[0].strip())[1:]))
  distance = list(map(int, re.split(' +', lines[1].strip())[1:]))
  ways = []
  for i in range(len(time)):
    ways.append(cnt(time[i], distance[i]))
  rs = 1
  for i in ways:
    rs *= i
  return rs
