def solution(input):
  ds = input.split("\n")
  for i in range(len(ds)):
    ds[i] = (ds[i].split(":")[1]).split("; ")
  rs = 0
  for k in range(len(ds)):
    rs_game = k
    game = ds[k]
    for round in game:
      blue = 0
      red = 0
      green = 0
      for j in round.split(", "):
        a = j.split(" ")
        number,string = a[-2],a[-1]
        number = int(number)
        if string == "red":
          red += number
        elif string == "green":
          green += number
        elif string == "blue":
          blue += number
        if blue > 14 or green > 13 or red > 12:
          rs_game = -1
    rs += rs_game+1
  return str(rs)