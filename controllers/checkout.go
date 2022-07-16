package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	"github.com/gin-gonic/gin"
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

	var stock []CreateCheckoutInput

	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}

	err = json.Unmarshal(body, &stock)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}

	c.String(200, fmt.Sprintf("%#v", stock))

	// checkout := models.Checkout{
	// 	UserID:     input.UserID,
	// 	ProductId:  input.ProductId,
	// 	Qty:        input.Qty,
	// 	Price:      input.Price,
	// 	CreatedAt:  input.CreatedAt,
	// 	CheckoutID: input.CheckoutID,
	// }

	// db := c.MustGet("db").(*gorm.DB)
	// db.Create(&checkout)

	// var input CreateCheckoutInput
	// createCheckoutInput := CreateCheckoutInput{}

	// if err := c.BindJSON(&createCheckoutInput); err != nil {
	// 	c.AbortWithError(http.StatusBadRequest, err)
	// 	return
	// }

	// c.JSON(http.StatusOK, createCheckoutInput)
	// for key, value := range createCheckoutInput {
	// 	fmt.Println(key, value)

	// if err := c.ShouldBindJSON(&input); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// }

	// c.JSON(http.StatusOK, 200)
}
