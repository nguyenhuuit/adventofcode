def solution(input):
  kq = 0
  chuoi = input.split("\n")
  for i in chuoi:
    l = len(i)//2
    d = i[:l]
    c = set(i[l:])
    for j in d:
      if j in c:
        break
    if j.isupper():
      kq += ord(j.lower())-70
    else:
      kq += ord(j.lower())-96
  return kq