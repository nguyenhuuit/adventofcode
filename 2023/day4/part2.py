import re

def solution(input):
  d = input.split("\n")
  point = []
  s = []
  for i in range(len(d)):
    m = d[i]
    m = re.split(": +", m)[1]
    d[i] = re.split(r" \| +", m)
    for j in range(len(d[i])):
      d[i][j] = re.split(" +", d[i][j])
    d[i][0] = set(d[i][0])
  for card in d:
    so = card[1]
    winning = card[0]
    c = 0
    for k in so:
      if k in winning:
        c += 1
    s.append(c)
    point.append(1)
  for m in range(len(d)):
    for i in range(m+1,s[m]+m+1):
      if i >= len(d):
        break
      point[i] += point[m]
  return sum(point)