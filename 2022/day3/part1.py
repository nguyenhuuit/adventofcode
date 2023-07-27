def solution(input):
  kq = 0
  chuoi = input.split("\n")
  for i in chuoi:
    d = i[:len(i)//2]
    c = i[len(i)//2:]
    chung = ""
    for j in d:
      if j in list(c):
        chung = j
        break
    if j.lower() != j:
      kq += 26
    kq += ord(j.lower())-96
  return kq