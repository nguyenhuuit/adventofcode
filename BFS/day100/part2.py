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
  rs = 0
  for i in range(1,n+1):
    next = (s + tuple([i]))
    if safe(next):
      if len(next) == n:
        rs += 1
      else:
        rs += search(next, n)
  return rs

def solution(input):
  n = int(input)
  count = search(tuple(), n)
  return count
