def solution(input):
  kq = 0
  chuoi = input.split("\n")
  for i in range(len(chuoi)//3):
    h1 = chuoi[i*3]
    h2 = set(chuoi[i*3+1])
    h3 = set(chuoi[i*3+2])
    for j in h1:
      if j in h2 and j in h3:
        break
    if j.isupper():
      kq += ord(j.lower())-70
    else:
      kq += ord(j.lower())-96
  return kq