def solution(input):
  ds = input.split("\n")
  sbd = 5
  kq = ""
  for i in ds:
    for j in range(len(i)):
      dc = i[j]
      if dc == "R":
        if sbd % 3 != 0:
          sbd += 1
      elif dc == "L":
        if sbd % 3 != 1:
          sbd -= 1
      elif dc == "U":
        if sbd > 3:
          sbd -= 3
      else:
        if sbd < 7:
          sbd += 3
    kq = kq + str(sbd)
  return kq
        