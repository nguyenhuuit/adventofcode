def solution(input):
  h = 0
  v = 0
  a = 0
  for line in input.split("\n"):
    cmd, value = line.split(" ")
    if cmd == 'forward':
      v += int(value) * a
      h += int(value)
    if cmd == 'up': a -= int(value)
    if cmd == 'down': a += int(value)
  return h*v
