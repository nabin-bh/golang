package models

type Book struct {
	ID          uint    `json:"id" gorm:"primary_key"`
	Name        string  `json:"name"`
	Category    string  `json:"category"`
	Author      string  `json:"author"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
}
