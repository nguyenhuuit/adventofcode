def solution(input):
  lines = list(map(int, input.split("\n")))
  rs = 0
  for i in range(len(lines)-3):
    if sum(lines[i:i+3]) < sum(lines[i+1:i+4]): rs += 1
  return rs