def tinh(a,d):
  d1 = ["A","B","C"]
  d2 = ["Y","Z","X"]
  if d == "Y":
    return d2[(d1.index(a)-1)%3]
  if d == "Z":
    return d2[d1.index(a)]
  if d == "X":
    return d2[(d1.index(a)+1)%3]
  
def solution(input):
  tran_dau = input.split("\n")
  cases = {
    "A X":4,
    "A Y":8,
    "A Z":3,
    "B X":1,
    "B Y":5,
    "B Z":9,
    "C X":7,
    "C Y":2,
    "C Z":6
  }
  diem = 0
  for i in tran_dau:
    a,d = i.split()
    b = tinh(a,d)
    diem += cases[a + " " + b]
  return diem
    
