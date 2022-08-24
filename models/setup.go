package models

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

// SetupDB : initializing mysql database
func SetupDB() *gorm.DB { 
	URL := fmt.Sprintf("root@tcp(localhost)/book_pasal?parseTime=true")
	db, err := gorm.Open("mysql", URL)
	if err != nil {
		panic(err.Error())
	}
	return db
}
