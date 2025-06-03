# frozen_string_literal: true

def functional_style(input)
  lefts, rights = input.split("\n").map { |line| line.split('   ') }.transpose

  counts = rights.tally
  lefts.sum { |left| counts[left].to_i * left.to_i }
end

def imperative_style(input)
  lines = input.split("\n")

  lefts = []
  rights = Hash.new(0)

  for line in lines
    left, right = line.split('   ')
    lefts << left
    rights[right] += 1
  end

  similarity = 0
  for left in lefts
    similarity += left.to_i * rights[left]
  end

  similarity
end

def solution(input)
  functional_result = functional_style(input)
  imperative_result = imperative_style(input)
  puts "Functional result: #{functional_result}"
  puts "Imparative result: #{imperative_result}"

  functional_result
end
