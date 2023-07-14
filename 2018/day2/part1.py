def solution(input):
  chuoi = input.split("\n")
  s2 = [0] * len(chuoi)
  s3 = [0] * len(chuoi)
  for i in range(len(chuoi)):
    for j in chuoi[i]:
      if chuoi[i].count(j) == 2:
        s2[i] = 1
      if chuoi[i].count(j) == 3:
        s3[i] = 1
  return sum(s2) * sum(s3)
  
        