def find(numbers, target)
  stack = [['', numbers[0]]]
  until stack.empty?
    opers, acc = stack.pop
    next if acc > target
    return target if opers.length == numbers.length - 1 && acc == target # found
    next if opers.length == numbers.length - 1
    
    next_number = numbers[opers.length + 1]
    stack.push([opers + '*', acc * next_number])
    stack.push([opers + '+', acc + next_number])
  end
  0
end

def solution(input)
  input.each_line.sum do |line|
    target, tmp = line.split(': ')
    numbers = tmp.split.map(&:to_i)
    find(numbers, target.to_i)
  end
end
