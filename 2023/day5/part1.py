def parse_section(section):
  lines = section.split('\n')[1:]
  return list(map(lambda line: list(map(int, line.split())), lines))

def parse(inp):
  sections = inp.split('\n\n')
  seeds = list(map(int, sections[0].split(': ')[1].split()))
  transforms = list(map(parse_section, sections[1:]))
  return seeds,transforms

def convert(seed, transforms):
  s = seed
  for transform in transforms:
    for transform_item in transform:
      dest_start, src_start ,rng = transform_item
      if src_start <= s <= src_start + rng:
        s = s - src_start + dest_start
        break
  return s

def solution(input):
  seeds,transforms = parse(input)
  return min(map(lambda x: convert(x,transforms), seeds))
