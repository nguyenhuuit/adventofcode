package main

import (
	"strconv"
	"strings"
)

func Part1(input string) interface{} {
	lines := strings.Split(input, "\n\n")
	var max int64 = 0
	for i := 0; i < len(lines); i++ {
		items := strings.Split(lines[i], "\n")
		var sum int64 = 0
		for j := 0; j < len(items); j++ {
			v, err := strconv.ParseInt(items[j], 10, 0)
			if err != nil {
				panic(err)
			}
			sum += v
		}
		if sum > max {
			max = sum
		}
	}
	return max
}
