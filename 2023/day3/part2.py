delta = [(0,1),(1,1),(-1,1),(1,0),(-1,0),(1,-1),(0,-1),(-1,-1)]
def kiem_tra(ds,a):
  ly = len(ds)
  lx = len(ds[0])
  s = set()
  for i in a:
    for j in delta:
      if -1 <i[1] + j[0] < ly and -1 < i[2] + j[1] < lx:
        if ds[i[1] + j[0]][i[2]+j[1]] == "*":
          s.add((i[1] + j[0],i[2]+j[1]))
  return int("".join(map(lambda x:x[0],a))),s

def solution(input):
  ds = input.split("\n")
  so = []
  rs = 0
  for i in range(len(ds)):
    a = []
    for j in range(len(ds[i])):
      if "0" <= ds[i][j] <= "9":
        a.append((ds[i][j],i,j))
      else:
        if len(a) != 0:
          so.append(a)
          a = []
    if len(a) != 0:
      so.append(a)
      a = []
  d = dict()
  for i in so:
    t = kiem_tra(ds,i)
    for p in t[1]:
      if p in d:
        d[p].append(t[0])
      else:
        d[p] = [t[0]]
  rs = 0
  for k in d:
    if len(d[k]) == 2:
      rs += d[k][0] * d[k][1]
  return rs
        