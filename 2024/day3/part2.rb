def solution(input)
  regex = /(mul\((\d+),(\d+)\)|do\(\)|don't\(\))/
  should_add = true

  input.scan(regex).reduce(0) do |sum, (full_match, first, second)|
    case full_match
    when 'do()'
      should_add = true
    when "don't()"
      should_add = false
    else
      sum += first.to_i * second.to_i if should_add
    end
    sum
  end
end
