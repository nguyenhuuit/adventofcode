def solution(input):
  instructions,d = input.split("\n\n")
  d = d.split("\n")
  d = list(map(lambda x:x.split(" = "), d))
  for i in range(len(d)):
    d[i][1] = tuple(d[i][1][1:-1].split(", "))
  dic = dict()
  for i in d:
    dic[i[0]] = i[1]
  current = "AAA"
  target = "ZZZ"
  c = 0
  i = 0
  while True:
    if instructions[i] == "L":
      current = dic[current][0]
    else:
      current = dic[current][1]
    c += 1
    if current == target:
      return c
    i += 1
    if i >= len(instructions):
      i = 0