delta = [
  (1,2),
  (2,1),
  (2,-1),
  (1,-2),
  (-1,-2),
  (-2,-1),
  (-2,1),
  (-1,2)
]

def valid(board,path,kich_thuoc):
  last = path[-1]
  move = board[last[1]][last[0]]
  if move < 0 or move > 7:
    return None
  d = delta[move]
  next_x = last[0]+d[0]
  next_y = last[1]+d[1]
  if -1 < next_x < kich_thuoc and -1 < next_y < kich_thuoc :
    if board[next_y][next_x] == -1:
      return (next_x,next_y)
  return None

def print_board(path,kich_thuoc):
  d = []
  for i in range(kich_thuoc):
    r = []
    for j in range(kich_thuoc):
      r.append("0")
    d.append(r)
  for i in range(len(path)):
    x,y = path[i]
    d[y][x] = str(i)
  print("\n".join(map(lambda x:" ".join(x), d)))
    
  
def solution(kich_thuoc):
  kich_thuoc = int(kich_thuoc)
  board = [] 
  for i in range(kich_thuoc):
    row = []
    for j in range(kich_thuoc):
      row.append(-1)
    board.append(row)
  start = (0,0)
  path = [start]
  board[0][0] = 0
  rs = 0
  first_path = None
  while len(path) != 0:
    next = valid(board,path,kich_thuoc)
    if next != None:
      board[next[1]][next[0]] = 0
      path.append(next)
      if len(path) == kich_thuoc*kich_thuoc:
        rs += 1
        if first_path == None:
          first_path = list(path)
        board[path[-1][1]][path[-1][0]] = -1
        path.pop(-1)
        board[path[-1][1]][path[-1][0]] += 1
    else:
      board[path[-1][1]][path[-1][0]] += 1
      if board[path[-1][1]][path[-1][0]] > 7:
        board[path[-1][1]][path[-1][0]] = -1
        path.pop(-1)
        if len(path) == 0:
          break
        board[path[-1][1]][path[-1][0]] += 1
  print_board(first_path,kich_thuoc)
  return rs