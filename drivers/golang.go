package main

import (
	"fmt"
	"os"
	"plugin"
	"time"
)

func main() {
	p, err := plugin.Open("drivers/golang.so")
	if err != nil {
		panic(err)
	}
	part := os.Args[2]
	solution, err := p.Lookup("Part" + part)
	if err != nil {
		panic(err)
	}
	file := os.Args[1]
	inp, err := os.ReadFile(file)
	if err != nil {
		panic(err)
	}
	start := time.Now()
	rs := solution.(func(string) interface{})(string(inp))
	timeElapsed := time.Since(start)
	fmt.Println(rs)
	fmt.Println(timeElapsed)
}
