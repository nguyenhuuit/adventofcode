def solution(input):
  d = input.split("\n\n")
  seed = list(map(int, d[0].split(": ")[1].split()))
  for l in d[1:]:
    biendoi = l.split("\n")[1:]
    biendoi = list(map(lambda x:list(map(int, x.split())), biendoi))
    for i in range(len(seed)):
      for j in biendoi:
        if j[1] <= seed[i] <= j[1]+j[2]-1:
          seed[i] += j[0]-j[1]
          break
  return min(seed)
    