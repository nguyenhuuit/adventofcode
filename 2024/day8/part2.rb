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
  counter = Hash.new { |h, k| h[k] = [] }
  antenna = Set.new

  city_map.each_with_index do |line, i|
    line.each_with_index do |cell, j|
      next if cell == '.'
      antenna.add([i, j])
      counter[cell] << [i, j]
    end
  end

  [counter, antenna]
end

def solution(input)
  city_map = input.split("\n").map(&:chars)
  counter, antinodes = count_antenna(city_map)

  counter.each_value do |positions|
    positions.combination(2).each do |p1, p2|
      dx, dy = p1[0] - p2[0], p1[1] - p2[1]

      [[p1, [dx, dy]], [p2, [-dx, -dy]]].each do |start, delta|
        current = [start[0] + delta[0], start[1] + delta[1]]
        while inside?(current, city_map)
          antinodes.add(current)
          current = [current[0] + delta[0], current[1] + delta[1]]
        end
      end
    end
  end

  print_city_map(city_map, antinodes)
  antinodes.size
end
