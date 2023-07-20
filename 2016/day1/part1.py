def solution(input):
  delta = [(0,1),(1,0),(0,-1),(-1,0)]
  ds_thaydoi = input.split(", ")
  huong = 0
  x,y = 0,0
  for i in ds_thaydoi:
    if i[0] == "R":
      huong += 1
    else:
      huong -= 1
    huong = huong % 4
    for j in range(int(i[1:])):
      dx,dy = delta[huong]
      x += dx
      y += dy
  return abs(x) + abs(y)
