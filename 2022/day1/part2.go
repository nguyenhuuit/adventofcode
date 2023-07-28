package main

import (
	"sort"
	"strconv"
	"strings"
)

func Part2(input string) interface{} {
	lines := strings.Split(input, "\n\n")
	var blocks = make([]int64, len(lines))
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
		blocks[i] = sum
	}
	sort.Slice(blocks, func(x int, y int) bool { return blocks[x] > blocks[y] })
	return blocks[0] + blocks[1] + blocks[2]
}
