from collections import deque

def safe(s):
  l = len(s)
  for i in range(l-1):
    for j in range(1,l-i):
      if s[i+j] in [s[i],s[i]-j,s[i]+j]:
        return False
  return True

def search(s,n):
  t = []
  for i in range(1,n+1):
    if safe(s+tuple([i])):
      t.append(s+tuple([i]))
  return t

def solution(input):
  n = int(input)
  start = ()
  queue = deque([start])
  rs = []
  while len(queue) != 0:
    current = queue.pop()
    for d in search(current,n):
      if len(d) == n:
        rs.append(d)
      else:
        queue.append(d)
  print(rs[0])
  return len(rs)