def validate(game):
  part = game.split(':')
  sets = part[1].split(';')
  MAX_CUBES = {
    "red": 1,
    "green": 1,
    "blue": 1
  }
  for i in sets:
    colors = i.split(',')
    for j in colors:
      [quantity, color] = j[1:].split()
      MAX_CUBES[color] = max(int(quantity), MAX_CUBES[color])
  return MAX_CUBES['blue'] * MAX_CUBES['green'] * MAX_CUBES['red']

def solution(input):
  games = input.split('\n')
  return sum(map(validate, games))
