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
)

func main() {
	godotenv.Load(".env")
	database.Connect("root:root@tcp(localhost:8889)/book_pasal?parseTime=true")
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

	r.Run(":8080")
}
