def solution(input):
  d = input.split()
  result = 0
  for i in d:
    ln = []
    for j in i:
      if "0" <= j <= "9":
        ln.append(int(j))
    result += ln[0]*10 + ln[-1]
  return result