def symbol(c):
  return (c < "0" or c > "9" ) and c != "."

delta = [(0,1),(1,1),(-1,1),(1,0),(-1,0),(1,-1),(0,-1),(-1,-1)]
def kiem_tra(ds,a):
  ly = len(ds)
  lx = len(ds[0])
  for i in a:
    for j in delta:
      if -1 <i[1] + j[0] < ly and -1 < i[2] + j[1] < lx:
        if symbol(ds[i[1] + j[0]][i[2]+j[1]]):
          return int("".join(map(lambda x:x[0],a)))
  return 0

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
  return sum(map(lambda x:kiem_tra(ds,x), so))
        