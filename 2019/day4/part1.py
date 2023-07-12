def solution(input):
  start,end = input.split("-")
  start = int(start)
  end = int(end)
  k = 0
  for i in range(start,end+1):
    tang = True
    kenhau = False
    for j in range(1,len(str(i))):
      if str(i)[j] < str(i)[j-1]:
        tang = False
      if str(i)[j] == str(i)[j-1]:
        kenhau = True
    if tang and kenhau:
      k += 1
  return k 