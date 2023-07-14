def tao_set(hv):
  s = set()
  for x in range(hv[1],hv[1]+hv[3]):
    for y in range(hv[2],hv[2]+hv[4]):
      s.add((x,y))
  return s,hv[0]

def phan_tich(s):
  ds = s.split()
  vitri,dolon = ds[2],ds[3]
  x,y = vitri.split(",")
  cd,cr = dolon.split("x")
  id = ds[0][1:]
  return tuple(map(int,[id,x,y[:-1],cd,cr]))

def solution(input):
  ds_hv = list(map(tao_set, map(phan_tich, input.split("\n"))))
  for hinh1,id1 in ds_hv:
    a = True
    for hinh2,id2 in ds_hv:
      if id1 == id2:
        continue
      if len(hinh1.intersection(hinh2)) > 0:
        a = False
        break
    if a:
      return id1
