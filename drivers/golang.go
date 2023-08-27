package main

import (
	"encoding/json"
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
	payload := map[string]interface{}{
		"result": rs,
		"time":   fmt.Sprint(timeElapsed),
	}
	js, err := json.Marshal(payload)
	if err != nil {
		panic(err)
	}
	fd := os.NewFile(3, "ipc")
	_, err = fd.Write([]byte(string(js) + "\n"))
	if err != nil {
		panic(err)
	}
}
