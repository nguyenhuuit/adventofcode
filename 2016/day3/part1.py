def solution(input):
  ds = input.split("\n")
  kq = 0
  for i in ds:
    canh_1,canh_2,canh_3 = map(int, i.split())
    if (canh_1 + canh_2 > canh_3) and (canh_2 + canh_3 > canh_1) and ( canh_1 + canh_3 > canh_2):
      kq += 1
  return kq