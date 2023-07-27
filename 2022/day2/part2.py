def tinh(a,d):
  d1 = ["A","B","C"]
  d2 = ["Y","Z","X"]
  if d == "Y":
    return d2[(d1.index(a)-1)%3]
  if d == "Z":
    return d2[d1.index(a)]
  if d == "X":
    return d2[(d1.index(a)+1)%3]
  
def diem_1(a,b):
  d1 = ["A","B","C"]
  d2 = ["Y","Z","X"]
  if b == d2[d1.index(a)]:
    return 6
  if b == chr(ord(a)+23):
    return 3
  return 0

def diem_2(b):
  if b == "Z":
    return 3
  if b == "Y":
    return 2
  return 1

def solution(input):
  tran_dau = input.split("\n")
  diem = 0
  for i in tran_dau:
    a,d = i.split()
    b = tinh(a,d)
    diem += diem_1(a,b) + diem_2(b)
  return diem
    
