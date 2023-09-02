def tao(s,n):
  ds = []
  for i in range(1,s%10):
    t = i*(10**(len(str(s))+1)) + s*10 + i
    if t <= n:
      ds.append(t)
  return ds

def solution(n):
  n = int(n)
  rs = 0
  tt = [1,2,3,4,5,6,7,8,9,11,22,33,44,55,66,77,88,99]
  while len(tt) != 0:
    s = tt.pop(0)
    if s <= n:
      rs += 1
    tt.extend(tao(s,n))
  return rs