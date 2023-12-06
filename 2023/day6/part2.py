import re
import math

def solution(input):
  lines = input.split('\n')
  t = int(''.join(re.split(' +', lines[0].strip())[1:]))
  d = int(''.join(re.split(' +', lines[1].strip())[1:]))
  x1 = 0.5*(t - math.sqrt(t*t - 4*d))
  x2 = 0.5*(t + math.sqrt(t*t - 4*d))
  return math.floor(x2) - math.ceil(x1) + 1


