def chuyen(s):
  return set(enumerate(s))
def noi(s):
  ds = list(s)
  ds.sort()
  return  "".join(map(lambda x:x[1],ds))

def solution(input):
  ds = list(map(chuyen, input.split("\n")))
  l = len(ds)
  for i in range(l):
    set1 = ds[i]
    for j in range(i+1,l):
      set2 = ds[j]
      set_common = set1.intersection(set2)
      if len(set1-set_common) == 1:
        return noi(set_common)      
