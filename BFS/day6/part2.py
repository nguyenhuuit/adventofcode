def safe(s):
  l = len(s)
  for i in range(l-1):
    for j in range(1,l-i):
      if s[i+j] in [s[i],s[i]-j,s[i]+j]:
        return False
  return True

def solution(input):
  board = [1]
  c = 0
  n = int(input)
  while len(board) != 0:
    if board[-1] > n:
      board.pop(-1)
      if len(board) == 0:
        break
      board[-1] += 1
    elif safe(board):
      if len(board) == n:
        c += 1
        board.pop(-1)
        board[-1] += 1
      else:
        board.append(1)
    else:
      board[-1] += 1
  return c