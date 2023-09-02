from collections import deque

class State:
  def __init__(self,prev,val,desc):
    self.prev = prev
    self.val = val
    self.desc = desc
  def print(self):
    kq = []
    pointer = self
    while pointer != None:
      kq.append((pointer.desc,pointer.val))
      pointer = pointer.prev
    kq.reverse()
    return kq

def search(s):
  t = []
  vi_tri = list(s).index("0")
  hang = vi_tri//3
  cot = vi_tri%3
  delta = [(0,1,"Qua trai"),(1,0,"Di len"),(0,-1,"Qua phai"),(-1,0,"Di xuong")]
  for d in delta:
    l = list(s)
    x = int(hang + d[0])
    y = int(cot + d[1])
    if -1 < x < 3 and -1 < y < 3:
      l[hang*3+cot] = l[x*3+y]
      l[x*3+y] = "0"
      t.append(("".join(l),d[2]))
  return t

def solution(input):
  trang_thai = "".join("".join(input.split("\n")).split())
  visited = set(trang_thai)
  queue = deque([State(None,trang_thai,"Bat dau")])
  while len(queue) != 0:
    s = queue.popleft()
    for d in search(s.val):
      if d[0] == "123456780":
        print(len(visited))
        print(len(s.print()))
        return s.print()
      if d[0] not in queue and d[0] not in visited:
        queue.append(State(s,d[0],d[1]))
        visited.add(d[0])
  return "Khong co cach de giai"