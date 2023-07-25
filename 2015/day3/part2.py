def solution(input):
  s = set()
  delta = {">":(1,0),"<":(-1,0),"^":(0,1),"v":(0,-1)}
  xs,ys = 0,0
  xr,yr = 0,0
  s.add((xs,ys))
  s.add((xr,yr))
  for i in range(len(input)):
    thay_doi = delta[input[i]]
    if i % 2 == 1:
      xs += thay_doi[0]
      ys += thay_doi[1]
      s.add((xs,ys))
    else:
      xr += thay_doi[0]
      yr += thay_doi[1]
      s.add((xr,yr))
  return len(s)
