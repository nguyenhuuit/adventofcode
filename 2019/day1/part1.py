def solution(input):
  ds = input.split("\n")
  tong = 0
  for i in ds:
    tong += int(i)//3-2
  return tong
