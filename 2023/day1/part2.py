m = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
}

def calc(line):
  l = len(line)
  numbers = []
  for i in range(0,l):
    if ('0' <= line[i] <= '9'):
      numbers.append(int(line[i]))
    elif i <= l-3 and line[i:i+3] in m:
      numbers.append(m[line[i:i+3]])
    elif i <= l-4 and line[i:i+4] in m:
      numbers.append(m[line[i:i+4]])
    elif i <= l-5 and line[i:i+5] in m:
      numbers.append(m[line[i:i+5]])

  return numbers[0] * 10 + numbers[-1]
def solution(input):
  return sum(map(calc, input.split()))

