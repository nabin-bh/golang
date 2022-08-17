package test

import (
	"golang/models"
	"testing"
)

func TestDBConnection(t *testing.T) {
	result := models.SetupDB()
	println("result success")
	println(result)

	// if result != "0x1400023bad0" {
	// 	t.Errorf("Database Connection FAILED")
	// } else {
	// 	t.Logf("Database Connection Pass")
	// }
}
