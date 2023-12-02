MAX_CUBES = {
  "red": 12,
  "green": 13,
  "blue": 14
}

def validate(game):
  part = game.split(':')
  sets = part[1].split(';')
  for i in sets:
    colors = i.split(',')
    for j in colors:
      [quantity, color] = j[1:].split()
      if (int(quantity) > MAX_CUBES[color]):
        return 0
  [_,id] = part[0].split()
  return int(id)

def solution(input):
  games = input.split('\n')
  return sum(map(validate, games))
