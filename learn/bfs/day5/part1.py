from queue import PriorityQueue

class State:
  def __init__(self,prev,hien_tai,desc, level):
    self.prev = prev
    self.hien_tai = hien_tai
    self.desc = desc
    self.level = level
  def path(self):
    kq = []
    pointer = self
    while pointer != None:
      kq.append((
        pointer.desc,
        pointer.hien_tai,
      ))
      pointer = pointer.prev
    kq.reverse()
    return kq
  def __lt__(self, other):
    return True

delta = {
  "L": [8,1,10,3,5,7,4,6,20,9,22,11,12,13,14,15,16,2,18,0,19,21,17,23],
  "L'": [19,1,17,3,6,4,7,5,0,9,2,11,12,13,14,15,16,22,18,20,8,21,10,23],
  "R": [0,18,2,16,4,5,6,7,8,1,10,3,13,15,12,14,23,17,21,19,20,9,22,11],
  "R'": [0,9,2,11,4,5,6,7,8,21,10,23,14,12,15,13,1,17,3,19,20,18,22,16],
  "F": [6,4,2,3,22,5,23,7,8,9,10,11,12,0,14,1,17,19,16,18,20,21,15,13],
  "F'": [13,15,2,3,1,5,0,7,8,9,10,11,12,23,14,22,18,16,19,17,20,21,4,6],
  "B": [0,1,12,14,4,3,6,2,9,11,8,10,21,13,20,15,16,17,18,19,5,7,22,23],
  "B'": [0,1,7,5,4,20,6,21,10,8,11,9,2,13,3,15,16,17,18,19,14,12,22,23],
  "U": [1,3,0,2,16,17,6,7,4,5,10,11,8,9,14,15,12,13,18,19,20,21,22,23],
  "U'": [2,0,3,1,8,9,6,7,12,13,10,11,16,17,14,15,4,5,18,19,20,21,22,23],
  "D": [0,1,2,3,4,5,10,11,8,9,14,15,12,13,18,19,16,17,6,7,21,23,20,22],
  "D'": [0,1,2,3,4,5,18,19,8,9,6,7,12,13,10,11,16,17,14,15,22,20,23,21]
}
def search(s):
  rs = []
  for k in delta.keys():
    d = delta[k]
    l = list(s)
    for i in range(len(d)):
      if d[i] != i:
        l[i] = s[d[i]]
    rs.append(("".join(l),k))
  return rs

def priority(s: str) -> int:
  p = 0
  for i in range(6):
    p += len(set(s[i*4:(i+1)*4 + 1])) - 1
  return p

pairs = [
  [ 0, 1,16,17],
  [ 2, 3, 8, 9],
  [ 0, 2, 4, 5],
  [ 1, 3,12,13],
  [20,21,10,11],
  [20,22, 6, 7],
  [21,23,14,15],
  [22,23,18,19],
  [ 5, 7, 8,10],
  [ 9,11,12,14],
  [13,15,16,18],
  [17,19, 4, 6]
] 
# an alternative heuristic function, but less effience than first one
def priority2(s: str) -> int:
  n = 0
  for i in pairs:
    if s[i[0]] == s[i[1]] and s[i[2]] == s[i[3]]:
      n += 1
  return 12 - n

def check(s: str) -> bool:
  for i in range(6):
    for j in range(3):
      for k in range(j+1,4):
        if s[i*4 + j] != s[i*4 + k]:
          return False
  return True

def solution(input):
  n = "".join(input.split())
  start = State(None,n,"⚪", 0)
  queue = PriorityQueue()
  queue.put((0,start))
  visited = set([n])
  while queue.qsize() != 0:
    p,s = queue.get()
    for d in search(s.hien_tai):
      
      if check(d[0]):
        print("Visit:",len(visited))
        last = State(s,d[0],d[1],s.level + 1)
        path = last.path()
        print("Moves:", len(path) - 1)
        return " ".join(map(lambda x: x[0], path))
      if d[0] not in visited:
        pri = priority(d[0])
        queue.put((pri + s.level + 1,(State(s,d[0],d[1], s.level + 1))))
        visited.add(d[0])
  return "No solution"