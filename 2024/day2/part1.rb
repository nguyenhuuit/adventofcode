def solution(input)
  input.each_line.count do |report|
    levels = report.split.map(&:to_i)
    direction = levels[1] - levels[0]

    next false unless direction.abs.between?(1, 3)

    levels.each_cons(2).all? do |level, next_level|
      distance = next_level - level
      (distance * direction).positive? && distance.abs.between?(1, 3)
    end
  end
end
