class MyRangeIterator:
  def __init__(self,start,end,step):
    self.end = end
    self.start = start
    self.step = step  
    self.current = start
  def __iter__(self):
    return self
  def __next__(self):
    if self.step < 0 and self.current <= self.end:
      raise StopIteration
    if self.step > 0 and self.current >= self.end:
      raise StopIteration
    t = self.current
    self.current += self.step
    return t

def my_range(*a):
  if len(a) == 1:
    return MyRangeIterator(0,a[0],1)
  elif len(a) == 2:
    return MyRangeIterator(a[0],a[1],1)
  else:
    return MyRangeIterator(a[0],a[1],a[2])
  
def my_range2(a):
  current = 0
  while current < a:
    yield current
    current += 1
    
def test():
  yield "a"
  yield "b"
  return "c"
  yield "c"
  
def my_map(fn,it):
  for i in it:
    yield fn(i)
  

def solution(input):
  ls = my_map(lambda x:x*x,[1,2,3,4,5,6,7])
  print(list(ls))