package controllers

import (
	"golang/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type CreateCheckoutInput struct {
	UserID     uint   `json:"user_id"`
	ProductId  uint   `json:"product_id"`
	Qty        uint   `json:"qty"`
	Price      string `json:"price"`
	CreatedAt  string `json:"created_at"`
	CheckoutID uint   `json:"checkout_id"`
}

func Checkout(c *gin.Context) {

	var input CreateCheckoutInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, input)

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
