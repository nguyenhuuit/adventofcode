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
    diem += cases[i]
  return diem
    
