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
  
def merge_sort(a):
  pass
      
def solution(input):
  d = [i for i in range(10)]
  shuffle(d)
  d1 = d.copy()
  d2 = d.copy()
  d.sort()
  quick_sort_first(d1)
  quick_sort_last(d2)
  return "last:"+str(d2==d)," ","first:"+str(d1==d)