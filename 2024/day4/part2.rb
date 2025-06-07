AROUNDS = [
  [1, 1],   # down-right
  [1, -1],  # down-left
  [-1, -1], # up-left
  [-1, 1]   # up-right
].freeze

VALID_PATTERNS = %w[SMMS SSMM MSSM MMSS].freeze

def check(position, characters)
  x = position[0]
  y = position[1]

  around_chars = AROUNDS.map do |dx, dy|
    nx = x + dx
    ny = y + dy

    next nil if nx.negative? || ny.negative? || nx >= characters.length || ny >= characters[0].length

    characters[nx][ny]
  end

  VALID_PATTERNS.include?(around_chars.join)
end

def solution(input)
  characters = input.split("\n").map(&:chars)

  characters.each_with_index.sum do |line, x|
    line.each_with_index.count do |char, y|
      char == 'A' && check([x, y], characters)
    end
  end
end
