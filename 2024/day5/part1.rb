def solution(input)
  rules, updates = input.split("\n\n")
  rules_set = Set.new(rules.lines.map(&:strip))

  updates.each_line.sum do |line|
    pages = line.split(',').map(&:strip)
    valid = pages.combination(2).all? do |a, b|
      !rules_set.include?("#{b}|#{a}")
    end
    valid ? pages[pages.length / 2].to_i : 0
  end
end
