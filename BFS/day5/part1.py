from collections import deque

class State:
  def __init__(self,prev,hien_tai,desc):
    self.prev = prev
    self.hien_tai = hien_tai
    self.desc = desc
  def path(self):
    kq = []
    pointer = self
    while pointer != None:
      kq.append(pointer.desc + " : " + pointer.hien_tai)
      pointer = pointer.prev
    kq.reverse()
    for i in kq[1:]:
      print(i)
    return kq

delta = {
  "L": [2,0,3,1,4,5,6,7],
  "L`":[1,3,0,2,4,5,6,7],
  "R": [0,1,2,3,5,7,4,6],
  "R`":[0,1,2,3,6,4,7,5],
  "F": [4,1,0,3,6,5,2,7],
  "F`":[2,1,6,3,0,5,4,7],
  "B": [0,3,2,7,4,1,6,5],
  "B`":[0,5,2,1,4,7,6,3],
  "U": [0,1,6,2,4,5,7,3],
  "U`":[0,1,3,7,4,5,2,6],
  "D": [1,5,2,3,0,4,6,7],
  "D`":[4,0,2,3,5,1,6,7]
}
def search(s):
  rs = []
  for k in delta.keys():
    d = delta[k]
    l = list(s)
    for i in range(8):
      if d[i] != i:
        l[i] = s[d[i]]
    rs.append(("".join(l),k))
  return rs
input_map = {
  "RBW":"0",
  "RBY":"1",
  "RGW":"2",
  "RGY":"3",
  "OBW":"4",
  "OBY":"5",
  "OGW":"6",
  "OGY":"7"
}
def solution(input):
  n = "".join(map(lambda x:input_map[x], input.split()))
  print(n)
  queue = deque([State(None,n,"Bat dau")])
  visited = set()
  while len(queue) != 0:
    s = queue.popleft()
    for d in search(s.hien_tai):
      if d[0] == "01234567":
        last = State(s,d[0],d[1])
        return " ".join(last.path())
      if d[0] not in visited:
        queue.append(State(s,d[0],d[1]))
        visited.add(d[0])
  return "khong co cach giai"