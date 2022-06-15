package config

import (
	"database/sql"
)

func Connect() *sql.DB {
	dbDriver := "mysql"
	dbUser := "root"
	dbPass := "root"
	dbName := "go_crud_with_mysql"

	db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
	if err != nil {
		panic(err.Error())
	}
	return db
}
