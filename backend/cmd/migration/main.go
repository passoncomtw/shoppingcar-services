package main

import (
	"flag"
	"fmt"
	"os"
)

func main() {
	// 解析命令行參數
	action := flag.String("action", "up", "Migration action: up, down")
	flag.Parse()

	// 執行遷移
	switch *action {
	case "up":
		fmt.Println("Running migrations up...")
		// 這裡實現遷移向上的邏輯
	case "down":
		fmt.Println("Running migrations down...")
		// 這裡實現遷移向下的邏輯
	default:
		fmt.Printf("Unknown action: %s\n", *action)
		os.Exit(1)
	}
}
