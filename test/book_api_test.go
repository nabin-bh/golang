package test

import (
	"bytes"
	"encoding/json"
	"golang/controllers"
	"golang/models"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

type CreateBookInput struct {
	Name        string `json:"name"`
	Category    string `json:"category"`
	Author      string `json:"author"`
	Description string `json:"description"`
	Price       string `json:"price"`
}

// println(color.Red + "This is Red" + color.Reset)
//     println(color.Green + "This is Green" + color.Reset)

func SetUpRouter() *gin.Engine {
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
		Name:        "test book",
		Category:    "1",
		Author:      "hari",
		Description: "nice book crated from test",
		Price:       "1200",
	}
	jsonValue, _ := json.Marshal(book)
	req, _ := http.NewRequest("POST", "/books/store", bytes.NewBuffer(jsonValue))

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusCreated, w.Code)
}

func TestFindBook(t *testing.T) {
	r := SetUpRouter()
	r.GET("/book/edit/:id", controllers.FindBook)
	req, _ := http.NewRequest("GET", "/book/edit/1", nil)

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestUpdateBook(t *testing.T) {
	r := SetUpRouter()
	r.POST("/book/update/:id", controllers.UpdateBook)
	book := CreateBookInput{
		Name:        "test book edited",
		Category:    "1",
		Author:      "hari",
		Description: "nice book crated from test",
		Price:       "1200",
	}
	jsonValue, _ := json.Marshal(book)
	println(jsonValue)
	req, _ := http.NewRequest("POST", "/book/update/1", bytes.NewBuffer(jsonValue))

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusCreated, w.Code)
}

func TestDeleteBook(t *testing.T) {
	r := SetUpRouter()
	r.DELETE("/book/:id", controllers.FindBook)
	req, _ := http.NewRequest("DELETE", "/book/1", nil)

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)
}
