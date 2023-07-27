def solution(input):
  chuoi = input.split("\n\n")
  kq = 0
  for i in chuoi:
    s = sum(map(int, i.split("\n")))
    if s > kq:
      kq = s
  return kq
