from queue import PriorityQueue

class State:
  def __init__(self,prev,val,desc,level):
    self.prev = prev
    self.val = val
    self.desc = desc
    self.level = level
  def print(self):
    kq = []
    pointer = self
    while pointer != None:
      kq.append((pointer.desc,pointer.val))
      pointer = pointer.prev
    kq.reverse()
    return kq
  def __lt__(self,other):
    return True

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
def distance(s,m):
  rs = 0
  for i in range(9):
    vt = s.index(str(i))
    vt2 = m[i]
    rs += abs(vt//3-vt2[0]) + abs(vt%3-vt2[1])
  return rs

def distance2(s):
  rs = 0
  for vitri in range(8):
    if s[vitri] != str(vitri + 1):
      rs += 1
  if s[8] != "0":
    rs += 1
  return rs


def distance3(s,m):
  rs = 0
  for i in range(9):
    vt = s.index(str(i))
    vt2 = m[i]
    rs += abs(vt//3-vt2[0]) + abs(vt%3-vt2[1])
  if any(map(lambda x:x in s[:3], ["21","32","31"])):
    rs += 5
  if any(map(lambda x:x in s[3:6], ["54","65","64"])):
    rs += 5
  if any(map(lambda x:x in s[6:9], ["87"])):
    rs += 5
  if any(map(lambda x:x in s[0::3], ["41","74","71"])):
    rs += 5
  if any(map(lambda x:x in s[1::3], ["52","82","85"])):
    rs += 5
  if any(map(lambda x:x in s[2::3], ["63"])):
    rs += 5
  return rs

def solution(input):
  trang_thai = "".join("".join(input.split("\n")).split())
  visited = set(trang_thai)
  queue = PriorityQueue()
  queue.put((0,State(None,trang_thai,"Bat dau",0)))
  m = [(2,2),(0,0),(0,1),(0,2),(1,0),(1,1),(1,2),(2,0),(2,1)]
  while queue.qsize() != 0:
    p,s = queue.get()
    for d in search(s.val):
      if d[0] == "123456780":
        print(len(visited))
        print(len(s.print()))
        return s.print()
      if d[0] not in visited:
        queue.put((distance3(d[0],m)+s.level+1,State(s,d[0],d[1],s.level+1)))
        visited.add(d[0])
  return "Khong co cach de giai"