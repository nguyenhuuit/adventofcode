def subtract(a):
  k = []
  b = True
  for i in range(1,len(a)):
    k.append(a[i]-a[i-1])
    if a[i] - a[i-1] != 0:
      b = False
  return (k,b)
      
def predict(a):
  l = [a]
  while True:
    s,b = subtract(l[-1])
    l.append(s)
    if b:
      break
  n = 0
  for i in range(len(l)-2,-1,-1):
    n = l[i][0] - n
  return n

def solution(input):
  d = input.split("\n")
  rs = 0
  for i in range(len(d)):
    rs += predict(list(map(int, d[i].split())))
  return rs
  