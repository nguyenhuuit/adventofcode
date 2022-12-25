def solution(input):
  lines = list(map(int, input.split("\n")))
  rs = 0
  for i in range(len(lines)):
    if lines[i] > lines[i-1]: rs += 1
  return rs