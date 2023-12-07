import re

def count(hand):
  rs = {}
  for i in hand[0]:
    if i not in rs:
      rs[i] = 1
    else:
      rs[i] += 1
  return rs

def classify(hand):
  c = count(hand)
  if len(c) == 1:
    return 7
  if len(c) == 5:
    return 1
  if len(c) == 4:
    return 2
  if len(c) == 2:
    if list(c.values())[0] == 4 or list(c.values())[0] == 1:
      return 6
    return 5
  if len(c) == 3:
    if 3 in list(c.values()):
      return 4
    return 3
  
def get_key(hand):
  d = {"A":14,"K":13,"Q":12,"J":11,"T":10}
  ds = [classify(hand)]
  for i in hand[0]:
    if i in d:
      ds.append(d[i])
    else:
      ds.append(int(i))
  ds.append(int(hand[1]))
  return tuple(ds)

def solution(input):
  d = list(map(lambda x:re.split(" +",x), input.split("\n")))
  d = list(map(get_key,d))
  d.sort()
  r = 0
  for i in range(len(d)):
    r += (i+1) * d[i][-1]
  return r