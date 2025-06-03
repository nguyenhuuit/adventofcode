# frozen_string_literal: true

def functional_style(input)
  lefts, rights = input.split("\n").map { |line| line.split('   ').map(&:to_i) }.transpose

  sorted_lefts = lefts.sort
  sorted_rights = rights.sort

  sorted_lefts.zip(sorted_rights).sum { |left, right| (left - right).abs }
end

def imperative_style(input)
  lines = input.split("\n")

  lefts = []
  rights = []

  for line in lines
    left, right = line.split('   ')
    lefts << left.to_i
    rights << right.to_i
  end

  sorted_lefts = lefts.sort
  sorted_rights = rights.sort

  distance = 0
  for i in 0..(lefts.length - 1)
    distance += (sorted_lefts[i] - sorted_rights[i]).abs
  end

  distance
end

def solution(input)
  functional_result = functional_style(input)
  imperative_result = imperative_style(input)
  puts "Functional result: #{functional_result}"
  puts "Imparative result: #{imperative_result}"

  functional_result
end
