def solution(input):
  vitri = 0
  st = 0
  for i in input:
    if i == "(":
      st += 1
    else:
      st -= 1
    vitri += 1
    if st < 0:
      return vitri
  return st
