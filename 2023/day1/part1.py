def calc(line):
  numbers = list(filter(lambda c: '0' <= c <= '9', list(line)))
  return int(numbers[0]) * 10 + int(numbers[-1])
def solution(input):
  return sum(map(calc, input.split()))
