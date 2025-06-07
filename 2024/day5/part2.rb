def solution(input)
  rules, updates = input.split("\n\n")
  rules_set = Set.new(rules.lines.map(&:strip))

  updates.each_line.sum do |line|
    pages = line.split(',').map(&:strip)
    valid = pages.combination(2).all? do |a, b|
      !rules_set.include?("#{b}|#{a}")
    end
    if valid
      0
    else
      pages = pages.sort { |a, b| rules_set.include?("#{b}|#{a}") ? 1 : -1 }
      pages[pages.length / 2].to_i
    end
  end
end
