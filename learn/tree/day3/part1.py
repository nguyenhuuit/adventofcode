def heapify(ls):
  while True:
    a = False
    l = len(ls)
    i = (l-2)//2
    while i > -1:
      minn = ls[i]
      if 2*i+1 < l and ls[2*i+1] < minn:
        minn = ls[2*i+1]
      if 2*i+2 < l and ls[2*i+2] < minn:
        minn = ls[2*i+2]
      if minn != ls[i]:
        a = True
        if minn == ls[i*2+1]:
          ls[i],ls[i*2+1] = ls[i*2+1],ls[i]
        else:
          ls[i],ls[i*2+2] = ls[i*2+2],ls[i]
      i -= 1
    if not a:
      break
def heappush(ls,value):
  ls.append(value)
  l = len(ls)
  i = (len(ls)-2)//2
  while True:
    c = True
    if i*2+2 < l and ls[i] > ls[i*2+2]:
      ls[i],ls[i*2+2] = ls[i*2+2],ls[i]
      c = False
    elif i*2+1 < l and ls[i] > ls[i*2+1]:
      ls[i],ls[i*2+1] = ls[i*2+1],ls[i]
      c = False
    if c or i == 0:
      break
    i = (i-1)//2
    
def heappop(ls):
  v = ls[0]
  ls[0],ls[-1] = ls[-1],ls[0]
  del ls[-1]
  i = 0
  l = len(ls)
  while True:
    minn = ls[i]
    if i*2+1 < l and ls[i*2+1] < minn:
      minn = ls[i*2+1]
    if i*2+2 < l and ls[i*2+2] < minn:
      minn = ls[i*2+2]
    if minn == ls[i]:
      break
    if minn == ls[i*2+1]:
      ls[i],ls[i*2+1] = ls[i*2+1],ls[i]
      i = i*2+1
    else:
      ls[i],ls[i*2+2] = ls[i*2+2],ls[i]
      i = i*2+2
    if i >= l:
      break
  return v

def solution(input):
  ls = [8,7,6,5,4,3,1]
  heapify(ls)
  heappush(ls,2)
  return str(ls)
  