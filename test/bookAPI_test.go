package test

import (
	"golang/controllers"
	"testing"
)

type CreateBookInput struct {
	Name        string `json:"name"`
	Category    string `json:"category"`
	Author      string `json:"author"`
	Description string `json:"description"`
	Price       string `json:"price"`
}

func TestBookList(t *testing.T) {
	result := controllers.BookList
	println(result)
}

func TestCreateBook(t *testing.T) {
	// controllers.CreateBook
}

func TestFindBook(t *testing.T) {
	// controllers.FindBook
}
