package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"golang/controllers"
	"golang/models"
)

func main() {
	r := gin.Default()
	db := models.SetupDB()
	db.AutoMigrate(&models.Book{})
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
	})
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": c.Request.Body})
	})
	r.GET("/books", controllers.FindTasks)
	r.POST("/books/store", controllers.CreateBook)
	// r.GET("/book/:id", controllers.FindTask)
	// r.PATCH("/book/:id", controllers.UpdateTask)
	// r.DELETE("book/:id", controllers.DeleteTask)
	r.Run()
}
