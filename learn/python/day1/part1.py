from functools import lru_cache

def say(s):
  def inner(name):
    print(s,name)
  return inner

def count(fn):
  c = 0
  def inner():
    nonlocal c
    fn()
    c += 1
    print(c)
  return inner

@count
def move():
  print("move")
  
def mycache(size=3):
  def outer(fn):
    d = dict()
    a = []
    def inner(*args):
      nonlocal d
      if args in d:
        del a[a.index(args)]
        a.append(args)
        return d[args]
      rs = fn(*args)
      if len(d) < size:
        d[args] = rs
        a.append(args)
      else:
        del d[a[0]]
        a.pop(0)
        d[args] = rs
        a.append(args) 
      return rs
    return inner
  return outer

@mycache(size=4)
# @lru_cache(maxsize=4)
def square(a):
  print("square",a)
  return a*a

@mycache(size=4)
def add(a,b):
  print("Add",a,b)
  return a+b

def solution(s):
  for i in range(1,6):
    print(square(i))
  for i in range(1,6):
    print(square(i))