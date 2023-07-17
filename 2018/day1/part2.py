def solution(input):
  thay_doi = map(int,input.split())
  s = set()
  kq = 0
  while True:
    i = 0
    for i in thay_doi:
      kq = kq + i
      if kq in s:
        return kq
      s.add(kq)
    
