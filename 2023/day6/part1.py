import re
import math

def solution(input):
  a = list(map(lambda x:x.split(":")[1], re.split("\n", input)))
  times, distances = list(map(lambda x:re.split(" +",x.strip()), a))
  k = 1
  for i in range(len(times)):
    rs = 0
    t = int(times[i])
    d = int(distances[i])
    x1 = (t - math.sqrt(t**2-4*d))/2
    x2 = (t + math.sqrt(t**2-4*d))/2
    k *= math.ceil(x2) - math.floor(x1)-1
  return k
    
    