package main

import (
	"fmt"
	"net/http"
	"text/template"
)

func uploadFile(w http.ResponseWriter, r *http.Request) {
	fmt.Println("method:", r.Method)
	if r.Method == "GET" {
		t, _ := template.ParseFiles("fileUp.gtpl")
		t.Execute(w, nil)
	}
}

func setupRoutes() {
	http.HandleFunc("/upload", uploadFile)
	http.ListenAndServe(":2020", nil)
}

func main() {
	setupRoutes()
}
