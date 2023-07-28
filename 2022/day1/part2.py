def solution(input):
  chuoi = input.split("\n\n")
  ds = []
  for i in chuoi:
    s = sum(map(int, i.split("\n")))
    ds.append(s)
  ds.sort(reverse=True)
  kq = sum(ds[:3])
  return kq
