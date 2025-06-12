# frozen_string_literal: true

DIRECTIONS = ['>', 'v', '<', '^'].freeze
DELTAS = [
  [0, 1],  # >
  [1, 0],  # v
  [0, -1], # <
  [-1, 0]  # ^
].freeze

def inside?(pos_x, pos_y, board)
  pos_x.between?(0, board.length - 1) && pos_y.between?(0, board[0].length - 1)
end

def find_start_position(board)
  board.each_with_index do |row, i|
    row.each_with_index do |cell, j|
      return [i, j, DIRECTIONS.index(cell)] if DIRECTIONS.include?(cell)
    end
  end
  nil
end

def loop?(start_x, start_y, direction, board)
  pos_x = start_x
  pos_y = start_y
  dir = direction
  states = Set.new(["#{pos_x},#{pos_y},#{dir}"])

  while inside?(pos_x, pos_y, board)
    dx = DELTAS[dir][0]
    dy = DELTAS[dir][1]
    next_x = pos_x + dx
    next_y = pos_y + dy

    return false unless inside?(next_x, next_y, board)

    next_cell = board[next_x][next_y]
    while next_cell == '#'
      dir = (dir + 1) % 4
      dx = DELTAS[dir][0]
      dy = DELTAS[dir][1]
      next_x = pos_x + dx
      next_y = pos_y + dy
      next_cell = board[next_x][next_y]
    end

    next_state = "#{next_x},#{next_y},#{dir}"
    return true if states.include?(next_state)

    states << next_state
    pos_x = next_x
    pos_y = next_y
  end
end

def solution(input)
  board = input.split("\n").map(&:chars)
  start_x, start_y, direction = find_start_position(board)

  visited = Set.new([[start_x, start_y]])
  pos_x = start_x
  pos_y = start_y
  dir = direction

  while inside?(pos_x, pos_y, board)
    dx = DELTAS[dir][0]
    dy = DELTAS[dir][1]
    next_x = pos_x + dx
    next_y = pos_y + dy

    break unless inside?(next_x, next_y, board)

    next_cell = board[next_x][next_y]
    if next_cell == '#'
      dir = (dir + 1) % 4
      dx = DELTAS[dir][0]
      dy = DELTAS[dir][1]
      next_x = pos_x + dx
      next_y = pos_y + dy
      next_cell = board[next_x][next_y]
    end

    visited << [next_x, next_y]
    pos_x = next_x
    pos_y = next_y
  end

  visited.delete([start_x, start_y])
  visited.count do |x, y|
    board[x][y] = '#'
    loop?(start_x, start_y, direction, board).tap do
      board[x][y] = '.'
    end
  end
end
