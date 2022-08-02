package golang

import (
	"testing"
)

type AddData struct {
	x, y   int
	result int
}

func TestDivide(t *testing.T) {

	result := Divide(5, 0)

	if result != 0 {
		t.Errorf("Divide(5, 0) FAILED. Expected %f, got %f\n", 0.0, result)
	} else {
		t.Logf("Divide(5, 0) PASSED. Expected %f, got %f\n", 0.0, result)
	}
}
