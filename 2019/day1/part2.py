def solution(input):
  ds = input.split("\n")
  tong = 0
  for i in ds:
    s = int(i)//3-2
    while s > 0:
      tong += s
      s = s//3-2
  return tong