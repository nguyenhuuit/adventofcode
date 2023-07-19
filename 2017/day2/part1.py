def solution(input):
  ds = input.split("\n")
  kq = 0
  for i in ds:
    dayso = map(int,i.split("\t"))
    kq += int(max(dayso)) - int(min(dayso))
  return kq