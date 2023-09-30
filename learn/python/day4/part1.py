from random import shuffle

#All my sort
def exchange_sort(a):
  l = len(a)
  for i in range(l):
    for j in range(i,l):
      if a[i] > a[j] :
        a[i],a[j] = a[j],a[i]
        
def selection_sort(a):
  l = len(a)
  for i in range(l):
    min_i = i
    for j in range(i,l):
      if a[j] < a[min_i]:
        min_i = j
    a[i],a[min_i] = a[min_i],a[i]

def bubble_sort(a):
  l = len(a)
  for i in range(l-1):
    for j in range(l-1):
      if a[j] > a[j+1]:
        a[j],a[j+1] = a[j+1],a[j]
        
def insertion_sort(a):
  l = len(a)
  for i in range(1,l):
    j = i
    v = a[i]
    while j > 0:
      if a[j-1] > v:
        a[j] = a[j-1]
      else:
        break
      j -= 1
    a[j] = v
  
def solution(input):
  d = [i for i in range(100)]
  shuffle(d)
  d1 = d.copy()
  d1.sort()
  selection_sort(d)
  return str(d1 == d)