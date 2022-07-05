package controllers

import (
	"golang/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type CreateBookInput struct {
	Name        string  `json:"name"`
	Category    string  `json:"category"`
	Author      string  `json:"author"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
}

// type UpdateTaskInput struct {
// 	AssingedTo string `json:"assignedTo"`
// 	Task       string `json:"task"`
// }

func FindTasks(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var tasks []models.Book
	db.Find(&tasks)
	c.JSON(http.StatusOK, gin.H{"data": tasks})
}

func CreateBook(c *gin.Context) {
	var input CreateBookInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	book := models.Book{
		Name:        input.Name,
		Category:    input.Category,
		Author:      input.Author,
		Description: input.Description,
		Price:       input.Price,
	}

	db := c.MustGet("db").(*gorm.DB)
	db.Create(&book)
	c.JSON(http.StatusOK, gin.H{"data": book})
}

// GET /tasks/:id
// Find a task
// func FindTask(c *gin.Context) { // Get model if exist
// 	var task models.Book
// 	db := c.MustGet("db").(*gorm.DB)
// 	if err := db.Where("id = ?", c.Param("id")).First(&task).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": task})
// }

// // PATCH /tasks/:id
// // Update a task
// func UpdateTask(c *gin.Context) {
// 	db := c.MustGet("db").(*gorm.DB)
// 	// Get model if exist
// 	var task models.Book
// 	if err := db.Where("id = ?", c.Param("id")).First(&task).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
// 		return
// 	}
// 	// Validate input
// 	var input UpdateTaskInput
// 	if err := c.ShouldBindJSON(&input); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	db.Model(&task).Updates(input)
// 	c.JSON(http.StatusOK, gin.H{"data": task})
// }

// // DELETE /tasks/:id
// // Delete a task
// func DeleteTask(c *gin.Context) {
// 	// Get model if exist
// 	db := c.MustGet("db").(*gorm.DB)
// 	var book models.Book
// 	if err := db.Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
// 		return
// 	}
// 	db.Delete(&book)
// 	c.JSON(http.StatusOK, gin.H{"data": true})
// }
