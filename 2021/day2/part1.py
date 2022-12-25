dir = { "forward": [0, 1], "up": [-1, 0], "down": [1, 0] }
def solution(input):
  h = 0
  v = 0
  for line in input.split("\n"):
    cmd, value = line.split(" ")
    dx, dy = dir[cmd]
    h += int(value) * dx
    v += int(value) * dy
  return h*v
