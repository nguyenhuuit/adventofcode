def safe(s):
  l = len(s)
  for i in range(l-1):
    qi = s[i]
    for j in range(1,l-i):
      qj = s[i+j]
      if (qj == qi) or (qj == qi + j) or (qj == qi - j):
        return False
  return True

def rollback(board):
  board.pop(-1)
  if len(board) == 0: return
  board[-1] += 1

def solution(input):
  n = int(input)
  c = 0
  board = [1]
  i = 0
  while len(board) != 0:
    if board[-1] > n:
      rollback(board)
    elif safe(board):
      if len(board) == n:
        rollback(board)
        c += 1
      else:
        board += [1]
    else:
      if board[-1] >= n:
        rollback(board)
      else:
        board[-1] += 1
  return c