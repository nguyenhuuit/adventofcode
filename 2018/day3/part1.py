def phan_tich(s):
  ds = s.split()
  vitri,dolon = ds[2],ds[3]
  x,y = vitri.split(",")
  cd,cr = dolon.split("x")
  return tuple(map(int,[x,y[:-1],cd,cr]))

def solution(input):
  ds_hv = map(phan_tich, input.split("\n"))
  d = set()
  kq = set()
  for hv in ds_hv:
     for x in range(hv[0],hv[0]+hv[2]):
       for y in range(hv[1],hv[1]+hv[3]):
        if (x,y) in d:
          kq.add((x,y))
        else:
          d.add((x,y))
  return len(kq)
  
