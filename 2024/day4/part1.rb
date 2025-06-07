DIRECTIONS = [
  [0, 1],   # right
  [1, 0],   # down
  [0, -1],  # left
  [-1, 0],  # up
  [1, 1],   # down-right
  [1, -1],  # down-left
  [-1, 1],  # up-right
  [-1, -1]  # up-left
].freeze

PATTERN = 'XMAS'.freeze

def find(position, characters)
  DIRECTIONS.count do |dx, dy|
    x, y = position
    PATTERN[1..].each_char.all? do |char|
      x += dx
      y += dy
      break false if x.negative? || y.negative? || x >= characters.length || y >= characters[0].length

      break false if characters[x][y] != char

      true
    end
  end
end

def solution(input)
  characters = input.split("\n").map(&:chars)

  characters.each_with_index.sum do |line, idx|
    line.each_with_index.sum do |char, jdx|
      char == PATTERN[0] ? find([idx, jdx], characters) : 0
    end
  end
end
