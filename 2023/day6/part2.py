import re
import math

def solution(input):
  a = list(map(lambda x:re.split(" +",x), input.split("\n")))
  i = 1
  times = ""
  while i < len(a[0]):
    times += a[0][i]
    i += 1
  distances = ""
  i = 1
  while i < len(a[0]):
    distances += a[1][i]
    i += 1
  t = int(times)
  d = int(distances)
  x1 = (t - math.sqrt(t**2-4*d))/2
  x2 = (t + math.sqrt(t**2-4*d))/2
  return math.ceil(x2) - math.floor(x1) -1