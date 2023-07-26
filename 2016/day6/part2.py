def doi(slxh,m):
  min = m
  vitri = 0
  for i in range(26):
    if slxh[i] < min and slxh[i] >0:
      min = slxh[i]
      vitri = i
  return chr(vitri+97)

def solution(input):
  kq = ""
  chuoi = input.split("\n")
  for cot in range(0,len(chuoi[0])):
    slxh = [0]*26
    for hang in range(len(chuoi)):
      slxh[ord(chuoi[hang][cot])-97] += 1
    kq += doi(slxh,len(chuoi))
  return kq

