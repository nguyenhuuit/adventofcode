def kiemtra_1(chuoi):
  ds = list(map(dao, chuoi.split()))
  s = set(ds)
  return len(s) == len(ds)

def dao(chuoi):
  ds = list(chuoi)
  ds.sort()
  return "".join(ds)
  
def solution(input):
  ds_chuoi = input.split("\n")
  kq = 0
  for i in ds_chuoi:
    if kiemtra_1(i):
      kq += 1
  return kq
