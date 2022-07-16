package models

type Checkout struct {
	ID         uint   `json:"id" gorm:"primary_key"`
	UserID     uint   `json:"user_id"`
	ProductId  uint   `json:"product_id"`
	Qty        uint   `json:"qty"`
	Price      string `json:"price"`
	CreatedAt  string `json:"created_at"`
	CheckoutID uint   `json:"checkout_id"`
}
