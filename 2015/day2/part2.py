def solution(input):
  ds = input.split("\n")
  s = 0
  for i in ds:
    x,y,z = map(int,i.split("x"))
    ds1 = [x,y,z]
    ds1.sort()
    s += ((x*y*z)+ 2*ds1[0]+ 2*ds1[1])
  return s

