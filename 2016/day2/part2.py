ma_tran = [
  [" "," ","1"," "," "],
  [" ","2","3","4"," "],
  ["5","6","7","8","9"],
  [" ","A","B","C"," "],
  [" "," ","D"," "," "]
]
def solution(input):
  ds = input.split("\n")
  kq = ""
  hang = 2
  cot = 0
  global ma_tran
  for i in ds:
    for dc in i:
      if dc == "R":
        if cot == 4:
          continue
        if ma_tran[hang][cot+1] != " ":
          cot += 1
      if dc == "L":
        if cot == 0:
          continue
        if ma_tran[hang][cot-1] != " ":
          cot -= 1
      if dc == "U":
        if hang == 0:
          continue
        if ma_tran[hang-1][cot] != " ":
          hang -= 1
      if dc == "D":
        if hang == 4:
          continue
        if ma_tran[hang+1][cot] != " ":
          hang += 1
    kq = kq + ma_tran[hang][cot]
  return kq
        