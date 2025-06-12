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

def solution(input)
  board = input.split("\n").map(&:chars)
  start_x, start_y, direction = find_start_position(board)

  count = 1
  pos_x = start_x
  pos_y = start_y

  while inside?(pos_x, pos_y, board)
    dx = DELTAS[direction][0]
    dy = DELTAS[direction][1]
    next_x = pos_x + dx
    next_y = pos_y + dy

    return count unless inside?(next_x, next_y, board)

    next_cell = board[next_x][next_y]
    if next_cell == '#'
      direction = (direction + 1) % 4
      dx = DELTAS[direction][0]
      dy = DELTAS[direction][1]
      next_x = pos_x + dx
      next_y = pos_y + dy
      next_cell = board[next_x][next_y]
    end

    if next_cell == '.'
      count += 1
      board[next_x][next_y] = '*'
    end

    pos_x = next_x
    pos_y = next_y
  end

  count
end
