package main

import (
	"net/http"

	"golang/controllers"
	"golang/database"
	"golang/middlewares"
	"golang/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	// _ "github.com/nabin-bh/golang/docs" // This is important!
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Your Gin API with Swagger
// @version 1.0
// @description This is a basic CRUD API documentation with Swagger for Go Gin.

func main() {
	godotenv.Load(".env")
	database.Connect("root:root@tcp(localhost:3306)/book_pasal?parseTime=true")
	database.Migrate()

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

	// ...

	// @Summary Get a list of books
	// @Tags books
	// @Accept json
	// @Produce json
	// @Success 200 {array} Book
	// @Router /books [get]
	r.GET("/books", controllers.BookList)
	r.POST("/books/store", controllers.CreateBook)
	r.GET("/book/edit/:id", controllers.FindBook)
	r.POST("/book/update/:id", controllers.UpdateBook)

	r.DELETE("book/:id", controllers.DeleteBook)

	r.POST("/checkout", controllers.Checkout)

	api := r.Group("/api")
	{
		api.POST("/token", controllers.GenerateToken)
		api.POST("/user/register", controllers.RegisterUser)
		secured := api.Group("/secured").Use(middlewares.Auth())
		{
			secured.POST("/getauthuser", controllers.GetAuthUser)
			secured.GET("/ping", controllers.Ping)
		}
	}

	// ... Similar annotations for other CRUD operations

	// Use ginSwagger middleware to serve the Swagger JSON and UI.
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":8080")
}
