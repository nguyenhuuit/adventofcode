def solution(input):
  kq = 0
  chuoi = input.split("\n")
  for i in range(len(chuoi)//3):
    h1 = chuoi[i*3]
    h2 = chuoi[i*3+1]
    h3 = chuoi[i*3+2]
    chung = ""
    for j in h1:
      if j in list(h2) and j in list(h3):
        chung = j
        break
    if j.lower() != j:
      kq += 26
    kq += ord(j.lower())-96
  return kq