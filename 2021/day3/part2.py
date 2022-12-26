def find_oxygen_rating(lines):
  c = lines
  i = 0
  while (len(c) > 1):
    ones = []
    zeros = []
    for line in c:
      if (line[i] == "1"): ones.append(line)
      else: zeros.append(line)
    c =  ones if len(ones) >= len(zeros) else zeros
    i += 1
  return c[0]

def find_co2_rating(lines):
  c = lines
  i = 0
  while (len(c) > 1):
    ones = []
    zeros = []
    for line in c:
      if (line[i] == "1"): ones.append(line)
      else: zeros.append(line)
    c =  ones if len(ones) < len(zeros) else zeros
    i += 1
  return c[0]

def solution(input):
  lines = input.split("\n")
  return int(find_oxygen_rating(lines), 2) * int(find_co2_rating(lines), 2)
