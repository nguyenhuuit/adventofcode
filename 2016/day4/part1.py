def checksum(chuoi):
  ds_xh = [0] * 26
  s = chuoi.split("-")
  ss = "".join(s[:-1])
  for chu in ss:
    ds_xh[ord(chu)-97] += 1
  ds_tuple = []
  for j in range(26):
    if ds_xh[j] != 0:
      ds_tuple.append((-ds_xh[j],chr(j + 97)))
  ds_tuple.sort()
  ck = "".join(map(lambda x:x[1], ds_tuple[:5]))
  x = s[-1]
  id = int(x[:3])
  l = x[4:9]
  if ck == l:
    return id
  return 0 

def solution(input):
  return sum(map(checksum, input.split("\n")))
    
