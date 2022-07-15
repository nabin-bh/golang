package controllers

import (
	"golang/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type CreateCheckoutInput struct {
	UserID     uint    `json:"user_id"`
	ProductId  uint    `json:"product_id"`
	Qty        float32 `json:"qty"`
	Price      float32 `json:"price"`
	CreatedAt  string  `json:"created_at"`
	CheckoutID string  `json:"checkout_id"`
}

func Checkout(c *gin.Context) {
	var input CreateCheckoutInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	checkout := models.Checkout{
		UserID:     input.UserID,
		ProductId:  input.ProductId,
		Qty:        input.Qty,
		Price:      input.Price,
		CreatedAt:  input.CreatedAt,
		CheckoutID: input.CheckoutID,
	}

	db := c.MustGet("db").(*gorm.DB)
	db.Create(&checkout)

	c.JSON(http.StatusOK, checkout)
}
