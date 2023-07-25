def solution(input):
  st = 0
  for i in input:
    if i == "(":
      st += 1
    else:
      st -= 1
  return st
