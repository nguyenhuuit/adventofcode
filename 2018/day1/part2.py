def solution(input):
  thay_doi = map(int,input.split())
  s = []
  kq = 0
  for j in range(0,1000):
    for i in thay_doi:
      kq = kq + i
      if kq in s:
        return kq
      s.append(kq)
  print(s)
    
