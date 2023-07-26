def dk2(chuoi):
  for i in range(len(chuoi)-2):
    if chuoi[i] == chuoi[i+2]:
      return True
  return False    

def dk1(chuoi):
  for i in range(len(chuoi)-2):
    if chuoi[i] + chuoi[i+1] in chuoi[i+2:]:
      return True
    print(chuoi[i]+chuoi[i+1])
  return False
     
def solution(input):
  chuoi = input.split("\n")
  kq = 0
  for s in chuoi:
    if dk1(s) and dk2(s):
      kq += 1
  return kq