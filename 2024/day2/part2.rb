def find_unsafe_indexes(levels)
  direction_left = levels[1] - levels[0]
  unsafe_indexes_left = Set.new

  direction_right = levels[-1] - levels[-2]
  unsafe_indexes_right = Set.new

  levels.each_cons(2).with_index do |(level, next_level), idx|
    distance = next_level - level
    indexes = [idx, idx + 1]
    unsafe_indexes_left.merge(indexes) unless (distance * direction_left).positive? && distance.abs.between?(1, 3)
    unsafe_indexes_right.merge(indexes) unless (distance * direction_right).positive? && distance.abs.between?(1, 3)
  end

  unsafe_indexes_left.size < unsafe_indexes_right.size ? unsafe_indexes_left : unsafe_indexes_right
end

def solution(input)
  input.each_line.count do |report|
    levels = report.split.map(&:to_i)

    unsafe_indexes = find_unsafe_indexes(levels)

    next true if unsafe_indexes.empty?

    next false if unsafe_indexes.size >= 4

    unsafe_indexes.any? do |idx|
      new_levels = levels[0...idx] + levels[idx + 1..]
      find_unsafe_indexes(new_levels).empty?
    end
  end
end
