def solution(input):
  chuoi = input.split("\n\n")
  ds = []
  for i in chuoi:
    s = sum(map(int, i.split("\n")))
    ds.append(s)
  ds.sort(reverse=True)
  kq = ds[0] + ds[1] + ds[2]
  return kq
