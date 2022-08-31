package models

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

// SetupDB : initializing mysql database
func SetupDB() *gorm.DB {
	USER := "root" 
	HOST := "localhost"
	PORT := "3306"
	DBNAME := "book_pasal"
	URL := fmt.Sprintf("%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", USER, HOST, PORT, DBNAME)
	db, err := gorm.Open("mysql", URL)
	if err != nil {
		panic(err.Error())
	}
	return db
}
