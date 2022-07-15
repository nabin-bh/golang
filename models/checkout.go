package models

type Checkout struct {
	ID         uint    `json:"id" gorm:"primary_key"`
	UserID     uint    `json:"user_id"`
	ProductId  uint    `json:"product_id"`
	Qty        float32 `json:"qty"`
	Price      float32 `json:"price"`
	CreatedAt  string  `json:"created_at"`
	CheckoutID string  `json:"checkout_id"`
}
