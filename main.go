package main

import (
	"net/http"

	"golang/controllers"
	"golang/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	db := models.SetupDB()
	db.AutoMigrate(&models.Book{})
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
	})
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": c.Request.Body})
	})
	r.GET("/books", controllers.BookList)
	r.POST("/books/store", controllers.CreateBook)
	// r.GET("/book/:id", controllers.FindTask)
	// r.PATCH("/book/:id", controllers.UpdateTask)
	// r.DELETE("book/:id", controllers.DeleteTask)

	r.Run(":8080")
}
