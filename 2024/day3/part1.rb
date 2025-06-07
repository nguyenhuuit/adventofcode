def solution(input)
  regex = /mul\((\d+),(\d+)\)/
  input.scan(regex).reduce(0) do |sum, (first, last)|
    sum + (first.to_i * last.to_i)
  end
end
