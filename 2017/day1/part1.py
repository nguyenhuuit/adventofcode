def solution(input):
  sum = 0
  chuoi = input + input[0]
  for i in range(len(input)):
    if chuoi[i] == chuoi[i+1]:
      sum += int(chuoi[i])
  return sum
