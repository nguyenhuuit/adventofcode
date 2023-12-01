def solution(input):
  d = input.split()
  dic = {
    "one":1,
    "two":2,
    "three":3,
    "four":4,
    "five":5,
    "six":6,
    "seven":7,
    "eight":8,
    "nine":9
    }
  result = 0
  for i in d:
    ln = []
    for j in range(len(i)):
      if "0" <= i[j] <= "9":
        ln.append(int(i[j]))
      else:
        for k in range(j+3, j + 6):
          if i[j:k] in dic:
            ln.append(dic[i[j:k]])
            break
    result += ln[0]*10 + ln[-1]
  return result
