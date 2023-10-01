from random import shuffle

def quick_sort_first(a):
  def sort(l,r):
    if r-l < 1:
      return 
    p = a[l]
    i = l+1
    for j in range(l+1,r+1):
      if a[j] <= p:
        a[j],a[i] = a[i],a[j]
        i += 1
    a[i-1],a[l] = a[l],a[i-1]
    sort(l,i-2)
    sort(i,r)
  sort(0,len(a)-1)
  
def quick_sort_last(a):
  def sort(l,r):
    if r-l < 1:
        return 
    p = a[r]
    i = l
    for j in range(l,r):
      if a[j] <= p:
        a[j],a[i] = a[i],a[j]
        i += 1
    a[i],a[r] = a[r],a[i]
    sort(l,i-1)
    sort(i+1,r)
  sort(0,len(a)-1)

def merge(a,b):
  i = 0
  j = 0
  k = []
  while i != len(a) and j != len(b):
    if a[i] > b[j]:
      k.append(b[j])
      j += 1
    else:
      k.append(a[i])
      i += 1
  if i == len(a):
    k.extend(b[j:])
  else:
    k.extend(a[i:])  
  return k

def merge_sort(a):
  if len(a) == 1:
    return a
  m1 = merge_sort(a[:len(a)//2])
  m2 = merge_sort(a[len(a)//2:])
  return merge(m1,m2)
      
def solution(input):
  d = [i for i in range(100)]
  shuffle(d)
  d1 = d.copy()
  d.sort()
  d1 = merge_sort(d1)
  return str(d1 == d)