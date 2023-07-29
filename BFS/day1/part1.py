class State:
  def __init__(self,value,prev,desc):
    self.value = value
    self.prev = prev
    self.desc = desc
  def __hash__(self):
    return hash(self.value)
  def __eq__(self,other):
    if other == None:
      return False
    return self.value[0] == other.value[0] and self.value[1] == other.value[1]
  def __getitem__(self,item):
    return self.value[item]
  def __str__(self):
    return self.desc.ljust(24, " ") + " : " + str(self.value)
  def print(self):
    pointer = self
    ds = []
    while pointer != None:
      ds.append(str(pointer))
      pointer = pointer.prev
    ds.reverse()
    print(len(ds)-1,"Buoc")
    print("\n".join(ds))

def tao(s,ds):
  queue = []
  if s[0] > 0:
    queue.append(State((0,s[1]),s,"Do het binh 1"))
  if s[1] > 0:
    queue.append(State((s[0],0),s,"Do het binh 2"))
  if s[0] < ds[0]:
    queue.append(State((ds[0],s[1]),s,"Do day binh 1"))
  if s[1] < ds[1]:
    queue.append(State((s[0],ds[1]),s,"Do day binh 2"))
  if s[0] > 0 and s[1] < ds[1]:
    if s[0] + s[1] >= ds[1]:
      queue.append(State((s[0]+s[1]-ds[1],ds[1]),s,"Do tu binh 1 sang binh 2"))
    else:
      queue.append(State((0,s[0]+s[1]),s,"Do tu binh 1 sang binh 2"))
  if s[1] > 0 and s[0] < ds[0]:
    if s[0] + s[1] >= ds[0]:
      queue.append(State((ds[0],s[0]+s[1]-ds[0]),s,"Do tu binh 2 sang binh 1"))
    else:
      queue.append(State((s[0]+s[1],0),s,"Do tu binh 2 sang binh 1"))
  return queue

def solution(input):
  ds = list(map(int, input.split()))
  start = State((0,0),None,"Bat dau")
  queue = [start]
  visited = {start}
  kq = []
  while True:
    s = queue.pop(0)
    if s[0] == ds[2] or s[1] == ds[2]:
      kq.append(s)
    else:
      k = tao(s,ds)
      for i in k:
        if i not in visited and i not in queue:
          queue.append(i)
          visited.add(i)
    if len(queue) == 0:
      break
  for i in range(len(kq)):
    print("Cach " + str(i+1))
    kq[i].print()
    print()
      