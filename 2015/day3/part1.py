def solution(input):
  s = set()
  delta = {">":(1,0),"<":(-1,0),"^":(0,1),"v":(0,-1)}
  x,y = 0,0
  s.add((x,y))
  for i in input:
    thay_doi = delta[i]
    x += thay_doi[0]
    y += thay_doi[1]
    s.add((x,y))
  return len(s)