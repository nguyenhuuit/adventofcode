def solution(input):
  sum = 0
  chuoi = input + input
  l = len(input)//2
  for i in range(len(input)):
    if chuoi[i] == chuoi[i+l]:
      sum += int(chuoi[i])
  return sum
