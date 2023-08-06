from queue import PriorityQueue
from functools import lru_cache
import math

class State:
  def __init__(self,prev,val,desc,level):
    self.prev = prev
    self.val = val
    self.desc = desc
    self.level = level
  def path(self):
    kq = []
    pointer = self
    while pointer != None:
      kq.append((pointer.desc))
      pointer = pointer.prev
    kq.reverse()
    return kq
  def __lt__(self,other):
    return True
  
def parse_input(input: str) -> tuple:
  rs = []
  lines = input.strip().split("\n")
  for line in lines:
    cells = line.split()
    for cell in cells:
      rs.append(cell)
  return tuple(rs)

def search(from_state: tuple) -> list:
  l = math.floor(math.sqrt(len(from_state)))
  candidates = []
  blank_pos = from_state.index("0")
  blank_row = blank_pos // l
  blank_col = blank_pos % l
  directions = [(0,1,"⬅"),(1,0,"⬆"),(0,-1,"⮕"),(-1,0,"⬇")]
  for d in directions:
    candidate = list(from_state)
    next_row = int(blank_row + d[0])
    next_col = int(blank_col + d[1])
    if -1 < next_row < l and -1 < next_col < l:
      candidate[blank_row*l + blank_col] = candidate[next_row*l + next_col]
      candidate[next_row*l + next_col] = "0"
      candidates.append((tuple(candidate),d[2]))
  return candidates

@lru_cache()
def get_map_pos(t: tuple) -> dict:
  l = math.floor(math.sqrt(len(t)))
  rs = {}
  for idx,item in enumerate(t):
    row = idx // l
    col = idx % l
    rs[item] = (row, col)
  return rs

def mahattan(s1: tuple, s2: tuple) -> int:
  d = 0
  s1_map = get_map_pos(s1)
  s2_map = get_map_pos(s2)
  for i in s1:
    p1 = s1_map[i]
    p2 = s2_map[i]
    d += (abs(p1[0] - p2[0]) + abs(p1[1] - p2[1]))
  return d

def linear_conflicts(s1: tuple, s2: tuple) -> int:
  COST = 14
  d = 0
  s1_map = get_map_pos(s1)
  l = math.floor(math.sqrt(len(s1)))

  # horizontal
  for row in range(l):
    found = False
    for col in range(l-1):
      for next_col in range(col+1, l):
        item1 = s2[row*l + col]
        item2 = s2[row*l + next_col]
        p1 = s1_map[item1]
        p2 = s1_map[item2]
        if (p1[0] == row and p2[0] == row and item1 != "0" and item2 != "0" and p1[1] == p2[1] + 1):
          d += 1
          found = True
          break
      if found: break
  # vertical
  for col in range(l):
    found = False
    for row in range(l-1):
      for next_row in range(row+1, l):
        item1 = s2[row*l + col]
        item2 = s2[next_row*l + col]
        p1 = s1_map[item1]
        p2 = s1_map[item2]
        if (p1[1] == col and p2[1] == col and item1 != "0" and item2 != "0" and p1[0] == p2[0] + 1):
          d += 1
          found = True
          break
      if found: break
  return d * COST


def distance(current: tuple, end: tuple) -> int:
  d = 0
  d += mahattan(current, end)
  d += linear_conflicts(current, end)
  return d

target = """
1 2 3
4 5 6
7 8 0
"""

def solution(input: str) -> any:
  begin = parse_input(input)
  end = parse_input(target)
  visited = set(begin)
  queue = PriorityQueue()
  queue.put((0,State(None,begin,"⚪",0)))
  while queue.qsize() != 0:
    p,current = queue.get()
    for candidate, desc in search(current.val):
      if candidate == end:
        path = current.path()
        path.append(desc)
        print(len(visited), 'candidates')
        print(len(path) - 1, 'steps')
        return " ".join(path)
      if candidate not in visited:
        priority = distance(candidate, end) + current.level + 1
        queue.put((priority, State(current,candidate, desc, current.level + 1)))
        visited.add(candidate)
  return "No solution"