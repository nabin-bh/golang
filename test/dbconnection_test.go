package test

import (
	"golang/models"
	"testing"
)

func TestDBConnection(t *testing.T) {
	result := models.SetupDB()
	println("result success")
	println(result)
}
