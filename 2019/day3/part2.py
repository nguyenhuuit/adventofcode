def solution(input):
  l1,l2 = input.split("\n")
  l1 = l1.split(",")
  l2 = l2.split(",")
  delta = {
    "U": (0,1),
    "D": (0,-1),
    "R": (1,0),
    "L": (-1,0)
  }
  x1,y1 = 0,0
  path1 = set()
  step1 = dict()
  step2 = dict()
  step = 0
  for point in l1:
      d = delta[point[0]]
      for i in range(int(point[1:])):
          x1 += d[0]
          y1 += d[1]
          path1.add((x1,y1))
          step += 1
          if (x1,y1) not in step1:
            step1[(x1,y1)] = step

  x2,y2 = 0,0
  path2 = set()
  step = 0
  for point in l2:
      d = delta[point[0]]
      for i in range(int(point[1:])):
          x2 += d[0]
          y2 += d[1]
          step += 1
          path2.add((x2,y2))
          if (x2,y2) not in step2:
            step2[(x2,y2)] = step
  k = path1.intersection(path2)
  kq = 100000000000000000000000000000000000
  i = 0
  for x,y in k:
    distance = step1[(x,y)] + step2[(x,y)]
    if kq > distance:
      kq = distance
  return kq
