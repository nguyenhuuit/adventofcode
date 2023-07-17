def solution(input):
  kq = input
  i = 0
  print(kq)
  while i < len(kq)-1:
    if abs(ord(kq[i])-ord(kq[i+1])) == 32:
      kq = kq[:i] + kq[i+2:]
      if i > 0:
        i -= 1
    else:
      i += 1
  return len(kq)