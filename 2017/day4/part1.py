def kiemtra(chuoi):
  ds = chuoi.split()
  s = set(ds)
  return len(s) == len(ds)

def solution(input):
  ds_chuoi = input.split("\n")
  kq = 0
  for i in ds_chuoi:
    if kiemtra(i):
      kq += 1
  return kq