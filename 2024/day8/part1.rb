def print_city_map(city_map, antinodes)
  antinodes.each do |x, y|
    city_map[x][y] = '#' if city_map[x][y] == '.'
  end
  puts city_map.map(&:join).join("\n")
end

def inside?(point, city_map)
  x, y = point
  height = city_map.length
  width = city_map[0].length
  x.between?(0, height - 1) && y.between?(0, width - 1)
end

def count_antenna(city_map)
  city_map.each_with_index.with_object(Hash.new { |h, k| h[k] = [] }) do |(line, i), rs|
    line.each_with_index do |cell, j|
      rs[cell] << [i, j] unless cell == '.'
    end
  end
end

def solution(input)
  city_map = input.split("\n").map(&:chars)
  antennas = count_antenna(city_map)
  antinodes = Set.new

  antennas.each_value do |positions|
    positions.combination(2).each do |p1, p2|
      dx, dy = p1[0] - p2[0], p1[1] - p2[1]

      p1_side = [p1[0] + dx, p1[1] + dy]
      p2_side = [p2[0] - dx, p2[1] - dy]

      antinodes.add(p1_side) if inside?(p1_side, city_map)
      antinodes.add(p2_side) if inside?(p2_side, city_map)
    end
  end

  print_city_map(city_map, antinodes)
  antinodes.size
end
