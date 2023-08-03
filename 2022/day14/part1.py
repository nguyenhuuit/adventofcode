def diem_to_tuple(diem):
  return tuple(map(int, diem.split(",")))

def read_input(s):
  kq = set()
  ds_hang = s.split("\n")
  for hang in ds_hang:
    ds_diem = list(map(diem_to_tuple, hang.split(" -> ")))
    for j in range(len(ds_diem)-1):
      diem1 = ds_diem[j]
      diem2 = ds_diem[j+1]
      k = 1
      if diem1[1] > diem2[1] or diem1[0] > diem2[0]:
        k = -1
      if diem1[0] != diem2[0]:
        for d in range(diem1[0],diem2[0]+k,k):
          kq.add((d,diem1[1]))
      if diem1[1] != diem2[1]:
        for d in range(diem1[1],diem2[1]+k,k):
          kq.add((diem1[0],d))
  return kq

def solution(input):
  tuong = read_input(input)
  kq = 0
  max_y = max(list(map(lambda x:x[1], tuong)))
  while True:
    start = (500,0)
    while True:
      x,y = start
      new_start = start
      for dx in [0,-1,+1]:
        if (x+dx,y+1) not in tuong:
          new_start = (x+dx,y+1)
          break
      if new_start == start:
        break
      start = new_start
      if y+1 == max_y:
        return kq
    kq += 1
    tuong.add(start)