def giaima(chuoi):
  ds = chuoi.split("-")
  sl = int(ds[-1][:3])
  chuoi_moi = ""
  for i in ds[:-1]:
    for j in range(len(i)):
      o = ord(i[j])
      for k in range(sl):
        o += 1
        if o == 123:
          o = 97
      chuoi_moi += chr(o)
    chuoi_moi += " "
  return chuoi_moi
        

def solution(input):
  ten = input.split("\n")
  for k in ten:
    if  "northpole object storage" in giaima(k):
      return k[-10:-7]
