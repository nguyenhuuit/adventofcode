def solution(input):
  ds_xy = map(lambda x:tuple(map(int,x.split(", "))),input.split("\n"))
  ds_x = map(lambda x:x[0], ds_xy)
  ds_y = map(lambda x:x[1], ds_xy)
  min_x = min(ds_x)
  max_x = max(ds_x)
  max_y = max(ds_y)
  min_y = min(ds_y)
  sizes = dict()
  for x in range(min_x,max_x+1):
    for y in range(min_y,max_y+1):
      minn = 2000
      diem_minn = None
      for diem in ds_xy:
        distance = abs(diem[0]-x) + abs(diem[1]-y)
        if distance > minn:
          diem_minn = diem
          minn = distance
      if diem_minn in sizes:
        sizes[diem_minn] += 1
      else:
        sizes[diem_minn] = 1