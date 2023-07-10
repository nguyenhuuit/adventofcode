def solution(s):
  ds = list(map(int,s.split(",")))
  ds[1] = 12
  ds[2] = 2
  pointer = 0
  while ds[pointer] != 99:
      vitri = ds[pointer+3]
      giatri1 = ds[pointer+1]
      giatri2 = ds[pointer+2]
      if ds[pointer] == 1:
        ds[vitri] = ds[giatri1] + ds[giatri2]
      elif ds[pointer] == 2:
        ds[vitri] = ds[giatri1] * ds[giatri2]
      pointer += 4
  return ds[0]
    