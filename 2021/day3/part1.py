def solution(input):
  lines = input.split("\n")
  c1 = [0] * len(lines[0])
  for line in lines:
    for i,v in enumerate(line):
      if v == '1': c1[i] += 1
  gamma = "".join(list(map(lambda c: "1" if c > len(lines)//2 else "0", c1)))
  epsilon = "".join(list(map(lambda c: "1" if c < len(lines)//2 else "0", c1)))
  return int(gamma, 2) * int(epsilon, 2)
