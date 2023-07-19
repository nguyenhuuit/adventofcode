def solution(input):
  ds = input.split("\n")
  kq = 0
  for i in ds:
    dayso = map(int,i.split("\t"))
    for s1 in range(len(dayso)):
      for s2 in range(s1+1,len(dayso)):
        if dayso[s1] % dayso[s2] == 0 or dayso[s2] % dayso[s1] == 0:
          kq += dayso[s1] // dayso[s2] + dayso[s2] // dayso[s1]
  return kq 
