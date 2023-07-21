def solution(input):
  ds = list(map(lambda x:x.split(), input.split("\n")))
  c1 = []
  c2 = []
  c3 = []
  i = 0
  kq = 0
  while i + 2 < len(ds):
    for j in range(3):
      canh_1 = int(ds[i][j])
      canh_2 = int(ds[i+1][j])
      canh_3 = int(ds[i+2][j])
      if (canh_1 + canh_2 > canh_3) and (canh_2 + canh_3 > canh_1) and ( canh_1 + canh_3 > canh_2):
        kq += 1
    i += 3
  return kq