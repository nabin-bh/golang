package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type Todo struct {
	Title string
	Done  bool
}

type TodoPageData struct {
	PageTitle string
	Todos     []Todo
}

type Form struct {
	Name    string
	Address string
}

func insertIntoDB() {
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

	fmt.Printf("Data inserted success in row id: %d\n", lastId)
}

func main() {

	tmpl := template.Must(template.ParseFiles("form.html"))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		data := TodoPageData{
			PageTitle: "My TODO list",
			Todos: []Todo{
				{Title: "Task 1", Done: false},
				{Title: "Task 2", Done: true},
				{Title: "Task 3", Done: true},
			},
		}
		tmpl.Execute(w, data)
	})

	showpagehtml := template.Must(template.ParseFiles("Show.html"))
	http.HandleFunc("/store", func(w http.ResponseWriter, r *http.Request) {
		err := r.ParseForm()
		if err != nil {
			log.Fatal(err)
		}
		myvar := map[string]interface{}{
			"name":    r.Form.Get("name"),
			"address": r.Form.Get("address"),
		}
		showpagehtml.Execute(w, myvar)
	})

	http.ListenAndServe(":80", nil)
}
