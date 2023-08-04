from collections import deque

class State:
  def __init__(self,prev,toa_do):
    self.prev = prev
    self.toa_do = toa_do
  def path(self):
    k = []
    pointer = self
    while pointer.prev != None:
      k.append(pointer.toa_do)
      pointer = pointer.prev
    k.reverse()
    return k
  def __getitem__(self,toa_do):
    return self.toa_do

def diem_to_tuple(diem):
  return tuple(map(int, diem.split(",")))

def read_input(s):
  kq = set()
  ds_hang = s.split("\n")
  for hang in ds_hang:
    ds_diem = list(map(diem_to_tuple, hang.split(" -> ")))
    for j in range(len(ds_diem)-1):
      diem1 = ds_diem[j]
      diem2 = ds_diem[j+1]
      k = 1
      if diem1[1] > diem2[1] or diem1[0] > diem2[0]:
        k = -1
      if diem1[0] != diem2[0]:
        for d in range(diem1[0],diem2[0]+k,k):
          kq.add((d,diem1[1]))
      if diem1[1] != diem2[1]:
        for d in range(diem1[1],diem2[1]+k,k):
          kq.add((diem1[0],d))
  return kq

def search(toa_do):
  delta = [(0,1),(1,0),(0,-1),(-1,0)]
  x,y = toa_do
  t = []
  for dx,dy in delta:
    t.append((x+dx,y+dy))
  return t
  
def solution(input):
  tuong = read_input(input)
  A = (500,0)
  B = (498,11)
  queue = deque([State(None,A)])
  visited = set(A)
  while len(queue) != 0:
    s = queue.popleft()
    for d in search(s.toa_do):
      if d == B:
        print(len(visited))
        print(len(s.path()))
        return s.path()
      if d not in visited and d not in tuong:
        queue.append(State(s,d))
        visited.add(d)
        
