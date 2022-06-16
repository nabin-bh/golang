package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func main() {

	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:8889)/demo_go")
	defer db.Close()

	if err != nil {
		log.Println("hello")
		log.Fatal(err)
	}

	sql := "INSERT INTO students(email, first_name, last_name) VALUES ('admin@gmail.com', 'admin','admin')"

	res, err := db.Exec(sql)

	if err != nil {
		panic(err.Error())
	}

	lastId, err := res.LastInsertId()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("The last inserted row id: %d\n", lastId)
}

// SQL QUERY
// CREATE TABLE `students` (
// 	`id` bigint NOT NULL AUTO_INCREMENT,
// 	`email` varchar(255) DEFAULT NULL,
// 	`first_name` varchar(255) DEFAULT NULL,
// 	`last_name` varchar(255) DEFAULT NULL,
// 	PRIMARY KEY (`id`)
//   )
