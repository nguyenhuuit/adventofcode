def solution(input):
  start,end = map(int,input.split("-"))
  k = 0
  for i in range(start,end+1):
    tang = True
    kenhau = False
    stri = str(i)
    for j in range(1,len(stri)):
      if stri[j] < stri[j-1]:
        tang = False
      if stri[j] == stri[j-1] and stri[j]*3 not in stri:
        kenhau = True
    if tang and kenhau:
      k += 1
  return k