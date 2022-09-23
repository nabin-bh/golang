package loggenerate

import (
	"log"
	"os"
	"time"
)

func logInfo() {
	// open file and create if non-existent
	file, err := os.OpenFile("custom.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	logger := log.New(file, "Custom Log", log.LstdFlags)
	logger.Println("I am a new log message")
	time.Sleep(5 * time.Second)
	logger.Println("log test")
}
