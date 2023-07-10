import copy
def solution(s):
  goc = list(map(int,s.split(",")))
  target = 19690720
  for noun in range(0,100):
    for verb in range(0,100):
      ds = copy.deepcopy(goc)
      ds[1] = noun
      ds[2] = verb
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
      if ds[0] == target:
        return 100 * noun + verb