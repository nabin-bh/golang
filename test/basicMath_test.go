package test

import (
	"testing"
)

// type AddData struct {
// 	x, y   int
// 	result int
// }

func TestAdd(t *testing.T) {

	result := Add(5, 5)

	if result != 10 {
		t.Errorf("Add(5, 5) FAILED. Expected %f, got %d\n", 0.0, result)
	} else {
		t.Logf("Add(5, 5) PASSED. Expected %f, got %d\n", 0.0, result)
	}
}

func TestSubtract(t *testing.T) {

	result := Subtract(10, 5)

	if result != 5 {
		t.Errorf("Subtract(10, 5) FAILED. Expected %f, got %d\n", 0.0, result)
	} else {
		t.Logf("Subtract(10, 5) PASSED. Expected %f, got %d\n", 0.0, result)
	}
}

func TestDivide(t *testing.T) {

	result := Divide(1, 2)

	if result != 0 {
		t.Errorf("Divide(1, 2) FAILED. Expected %f, got %f\n", 0.0, result)
	} else {
		t.Logf("Divide(1, 2) PASSED. Expected %f, got %f\n", 0.0, result)
	}
}

func TestMultiply(t *testing.T) {

	result := Divide(1, 2)

	if result != 0 {
		t.Errorf("Divide(1, 2) FAILED. Expected %f, got %f\n", 0.0, result)
	} else {
		t.Logf("Divide(1, 2) PASSED. Expected %f, got %f\n", 0.0, result)
	}
}
