package test

import (
	"golang/controllers"
	"testing"
	"github.com/gin-gonic/gin"
	"encoding/json"
	"net/http"
	"bytes"
	"net/http/httptest"
	"github.com/stretchr/testify/assert"
	"golang/models"
)

type CreateBookInput struct {
	Name        string `json:"name"`
	Category    string `json:"category"`
	Author      string `json:"author"`
	Description string `json:"description"`
	Price       string `json:"price"`
}
func SetUpRouter() *gin.Engine{
    router := gin.Default()
	gin.Default()
	db := models.SetupDB()
	db.AutoMigrate(&models.Book{})
	router.Use(func(c *gin.Context) {
		c.Set("db", db)
	})
    return router
}

func TestBookList(t *testing.T) {
	r := SetUpRouter()
    r.GET("/books", controllers.BookList) 
    req, _ := http.NewRequest("GET", "/books", nil)

    w := httptest.NewRecorder()
    r.ServeHTTP(w, req)
    assert.Equal(t, http.StatusOK, w.Code)
}

func TestCreateBook(t *testing.T) { 
	r := SetUpRouter()
    r.POST("/books/store", controllers.CreateBook) 
    book := CreateBookInput{
        Name: "test book",
        Category: "1",
        Author: "hari",
		Description: "nice book crated from test",
		Price: "1200",
    }
    jsonValue, _ := json.Marshal(book)
	println(jsonValue)
    req, _ := http.NewRequest("POST", "/books/store", bytes.NewBuffer(jsonValue))

    w := httptest.NewRecorder()
    r.ServeHTTP(w, req)
    assert.Equal(t, http.StatusCreated, w.Code)
}

// func TestFindBook(t *testing.T) {
// 	// controllers.FindBook
// }

// func TestUpdateBook(t *testing.T) {
// 	// controllers.UpdateBook
// }

// func TestDeleteBook(t *testing.T) {
// 	// controllers.DeleteBook
// }
