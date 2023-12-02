def solution(input):
  ds = input.split("\n")
  for i in range(len(ds)):
    ds[i] = (ds[i].split(":")[1]).split("; ")
  rs = []
  for k in range(len(ds)):
    game = ds[k]
    blue = 0
    red = 0
    green = 0
    for round in game:
      for j in round.split(", "):
        a = j.split(" ")
        number,string = a[-2],a[-1]
        number = int(number)
        if string == "red" and number > red:
          red = number
        if string == "blue" and number > blue:
          blue = number
        if string == "green" and number > green:
          green = number
    rs.append(blue*green*red)
  return sum(rs)