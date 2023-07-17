def rut_gon(input):
  kq = input
  i = 0
  while i < len(kq)-1:
    if abs(ord(kq[i])-ord(kq[i+1])) == 32:
      kq = kq[:i] + kq[i+2:]
      if i > 0:
        i -= 1
    else:
      i += 1
  return len(kq)

def solution(input):
  minn  = len(input)
  for i in range(97,123):
    chuoi_moi = input.replace(chr(i), '').replace(chr(i-32), '')
    l = rut_gon(chuoi_moi)
    if l < minn:
      minn = l
  return minn