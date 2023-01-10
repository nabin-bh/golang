package controllers

import (
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type Users struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func dbConnect(c *gin.Context) (*gorm.DB, error) {
	// Get database connection from context
	db, ok := c.MustGet("db").(*gorm.DB)
	if !ok {
		return nil, errors.New("Failed to get database connection from context")
	}

	return db, nil
}

func LoginHandler(c *gin.Context) {
	var userreq Users
	var user Users

	// Parse request body
	if err := c.ShouldBindJSON(&userreq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	fmt.Println(userreq.Username)
	fmt.Println(userreq.Password)

	// Connect to MySQL database
	db := c.MustGet("db").(*gorm.DB)

	// Query database for user
	if err := db.Where("username = ?", userreq.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication 3 failed"})
		return
	}

	// Verify password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userreq.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication s failed"})
		return
	}

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &Claims{
		Username: user.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		},
	})

	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
		return
	}

	// Return JWT
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
