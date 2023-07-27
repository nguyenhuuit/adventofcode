def doi(slxh):
  max = 0
  vitri = 0
  for i in range(26):
    if slxh[i] > max:
      max = slxh[i]
      vitri = i
  return chr(vitri+97)

def solution(input):
  kq = ""
  chuoi = input.split("\n")
  for cot in range(0,len(chuoi[0])):
    slxh = [0]*26
    for hang in range(len(chuoi)):
      slxh[ord(chuoi[hang][cot])-97] += 1
    kq += doi(slxh)
  return kq