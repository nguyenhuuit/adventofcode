from collections import deque

def print_board(s,n):
  for i in s:
    l = ""
    for j in range(i-1):
      l += "."    
    l += "♛"
    for j in range(n-i):
      l += "."
    print(l)

def safe(s):
  l = len(s)
  for i in range(l-1):
    qi = s[i]
    for j in range(1,l-i):
      qj = s[i+j]
      if (qj == qi) or (qj == qi + j) or (qj == qi - j):
        return False
  return True

def search(s, n):
  rs = []
  for i in range(1,n+1):
    if safe(s + tuple([i])):
      rs.append(s + tuple([i]))
  return rs

def solution(input):
  n = int(input)
  count = 0
  start = ()
  queue = deque([start])
  last = ""
  while len(queue) != 0:
    current = queue.popleft()
    for d in search(current, n):
      if len(d) == n:
        count += 1
        last = d
      else:
        queue.append(d)
  print_board(last, n)
  return count
