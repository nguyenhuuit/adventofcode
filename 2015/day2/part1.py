def solution(input):
  ds = input.split("\n")
  s = 0
  for i in ds:
    x,y,z = map(int,i.split("x"))
    s += 2*(x*y) + 2*(y*z) + 2*(z*x)
    s += min(x*y,y*z,z*x)
  return s
